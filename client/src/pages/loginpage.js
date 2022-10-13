import { Button, TextField, Alert } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import loginUser from "../graphql/loginUser";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import "../assets/styles/login.css";

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
        navigate("/listemployee");
      }
    });
  };

  return (
    // <>
    //   <h1>Login Page</h1>;
    //   <form onSubmit={handleLoginSubmit}>
    //     <Container spacing={2} maxWidth="sm">
    //       {errors.map((error) => {
    //         return (
    //           <Alert
    //             key={error}
    //             severity="error"
    //             style={{ marginBottom: "20px" }}
    //           >
    //             {error.message}
    //           </Alert>
    //         );
    //       })}
    //       <Stack spacing={2} paddingBottom={2}>
    //         <TextField label="Login ID" name="loginId" />
    //         <TextField label="Password" name="password" />
    //       </Stack>
    //       <Button variant="contained" type="submit">
    //         Login
    //       </Button>
    //     </Container>
    //   </form>
    // </>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {/* <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}
          <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
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
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
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


