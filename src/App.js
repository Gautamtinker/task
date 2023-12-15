import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import NextPage from "./Components/NextPage";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = (credentialResponse) => {
    // Handle other login logic if needed
    console.log("Login success:", credentialResponse);

    // Check if the user is already logged in
    if (!isLoggedIn) {
      setLoggedIn(true);
      console.log("User is now logged in");
    } else {
      console.log("User is already logged in");
    }

    // Use the Navigate component to redirect to the home page
    return <Navigate to="/" replace />;
  };

  const handleLoginSuccess1 = (credentialResponse) => {
    setLoggedIn(false);
    // Handle other logic if needed
    console.log("Logout success:", credentialResponse);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <GoogleOAuthProvider clientId="86091979051-vm0da7cttnp8gcmnnjfa38linpgq35r0.apps.googleusercontent.com">
                <Login onLoginSuccess={handleLoginSuccess} />
              </GoogleOAuthProvider>
            }
          />
          <Route path="/SignupPage" element={<Signup />} />
          <Route
            path="/next-page"
            element={
              <PrivateRoute element={<NextPage />} isLoggedIn={isLoggedIn} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
