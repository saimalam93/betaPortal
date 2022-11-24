import { Button, TextField, Alert } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Container } from "@mui/system";
import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import loginUser from "../graphql/loginUser";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const LoginPage = () => {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const url = "http://localhost:4000/graphql";
  let userData = {};

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.loginId.value === "") {
      setErrors([new Error("Login ID is Required")]);
    } else {
      userData = {
        loginID: form.loginId.value,
        password: form.password.value,
      };
      login();
    }
  };
  const theme = createTheme();
  const login = async () => {
    await loginUser(url, { userData }).then((result) => {
      if (result.errors) {
        setErrors(result.errors);
      } else {
        console.log(result.data.loginUser);
        context.login(result.data.loginUser);
        if (result.data.loginUser.role === "Admin") {
          navigate("/listemployee");
        } else if (result.data.loginUser.role === "Director") {
          navigate("/director-dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box
            component="form"
            onSubmit={handleLoginSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {errors.map((error) => {
              return (
                <Alert
                  key={error}
                  severity="error"
                  style={{ marginBottom: "20px" }}
                >
                  {error.message}
                </Alert>
              );
            })}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Login ID"
              name="loginId"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
