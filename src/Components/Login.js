import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { GoogleLogin } from "@react-oauth/google";
import Button from "@mui/material/Button";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [onclick, setclick] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setpassowrd] = useState("");
  const validateEmail = (input) => {
    // You can use a regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(input)) {
      setError("");
    } else {
      setError("Please enter a valid email address");
    }
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);
    validateEmail(inputValue);
  };
  //   const googleConfig = {
  //     clientId:
  //       "86091979051-mgmk1m6asg5bidc3av79lkcf0774qpt4.apps.googleusercontent.com",
  //     redirectUri: "http://localhost:3000/", // Replace with your actual redirect URI
  //     responseType: "webclient",
  //     scope: "gautamtinker83@gmail.com",
  //   };

  //   // Callback function for successful Google authentication
  //   const handleGoogleLoginSuccess = (response) => {
  //     console.log("Google login success:", response);
  //     // TODO: Handle successful login, e.g., set user state, redirect, etc.
  //   };

  //   // Callback function for failed Google authentication
  //   const handleGoogleLoginFailure = (error) => {
  //     console.error("Google login failure:", error);
  //     // TODO: Handle failed login, e.g., show an error message.
  //   };
  const setclick1 = () => {
    navigate("/SignupPage");
  };
  const login = async () => {
    const response = await axios.post("http://localhost:4000/api/login", {
      username: email,
      password: password,
    });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // You can adjust the height based on your needs
      }}
    >
      <Card
        sx={{
          width: "40%",
          color: "white",
          textAlign: "center",
          height: "75%",
        }}
      >
        <CardContent>
          <Typography sx={{ color: "black", fontSize: "40px" }}>
            Login
          </Typography>
        </CardContent>
        <TextField
          id="outlined-basic"
          label="User Name"
          variant="outlined"
          sx={{ width: "70%" }}
          onChange={handleChange}
          value={email}
        />
        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              margin: "0",
              float: "left",
              paddingLeft: 87,
            }}
          >
            {error}
          </p>
        )}
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          sx={{ width: "70%", marginTop: 3 }}
          onChange={(e) => setpassowrd(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox inputProps={{ "aria-label": "controlled" }} />}
          label="Remember me"
          sx={{
            alignSelf: "flex-start",
            marginLeft: "45%",
            color: "black",
          }}
        />
        <Button
          variant="contained"
          sx={{
            alignSelf: "flex-start",
            marginLeft: "1%",
            // color: "black",
            width: "70%",
            marginBottom: "10px",
          }}
          onclick={login}
        >
          Login
        </Button>
        <Button
          variant="contained"
          sx={{
            alignSelf: "flex-start",
            marginLeft: "1%",
            // color: "black",
            width: "70%",
            marginBottom: "3%",
          }}
          onClick={setclick1}
        >
          Register
        </Button>
        <div style={{ width: "701px", marginLeft: "30%" }}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              setclick(true);
              onLoginSuccess(credentialResponse);
              navigate("/next-page");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
          />
        </div>
        ;
      </Card>
    </div>
  );
}

export default Login;
