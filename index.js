const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cors = require("cors");
const app = express();
app.use(cors());
// app.use(express.json());
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync({ force: true }).then(() => {
  console.log("Database synced");

  // Create a sample user with a hashed password
  User.create({
    username: "sample_user",
    password: bcrypt.hashSync("sample_password", 10),
  });
});

app.use(express.json());

// POST endpoint to create a new user
app.post("/api/users", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, password: hashedPassword });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST endpoint for user login and generating a JWT token
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    // Find the user in the database
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ username: user.username }, "secret_key", {
      expiresIn: "1h",
    });

    return res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Middleware to verify JWT token for protected routes
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, "secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = user;
    next();
  });
};

// Protected route example
app.get("/api/protected", verifyToken, (req, res) => {
  return res.json({ message: "This is a protected route", user: req.user });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
