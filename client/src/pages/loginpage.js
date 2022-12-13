import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Button, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/system";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/login.css";
import { AuthContext } from "../context/authContext";
import loginUser from "../graphql/loginUser";

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
        context.login(result.data.loginUser);
        if (result.data.loginUser.role === "Admin") {
          navigate("/listemployee");
        } else if (result.data.loginUser.role === "Director") {
          navigate("/director-dashboard");
        } else if (result.data.loginUser.role === "Employee") {
          navigate("/employee-dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    });
  };

  return (
    <div class="flex-container">
      <div>
        <img
          class="login_img"
          src={require("../assets/images/login_img.png")}
          alt="login_img"
          width={"200%"}
        />
      </div>

      <div>
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
      </div>
    </div>
  );
};

export default LoginPage;
