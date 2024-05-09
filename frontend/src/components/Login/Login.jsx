import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }

    if (email && password) {
      try {
        // Replace the URL with your actual login API endpoint
        const response = await axios.post('http://127.0.0.1:8000/api/login/', {
          email,
          password
        });

        if (response.data.cust_id) {
          // Store the customer ID in localStorage
          localStorage.setItem('cust_id', response.data.cust_id);

          // Navigate based on cust_id
          if (response.data.cust_id === 8) {
            navigate('/employee');
          } else {
            navigate('/customer');
          }
        } else {
          // Handle errors or invalid login
          console.error('Login Failed: No customer ID received');
        }
      } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Box
        sx={{
          width: 500,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          border: "1px solid black",
          padding: 3,
        }}
      >
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Login Form</h2>
          <TextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="email"
            sx={{ mb: 3 }}
            fullWidth
            value={email}
            error={emailError}
          />
          <TextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="password"
            value={password}
            error={passwordError}
            fullWidth
            sx={{ mb: 3 }}
          />
          <Button variant="outlined" color="secondary" type="submit">
            Login
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Login;