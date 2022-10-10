import { Button, TextField, Alert } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const login = async () => {
    await loginUser(url, { userData }).then((result) => {
      if (result.errors) {
        setErrors(result.errors);
      } else {
        context.login(result.data.loginUser);
        navigate("/");
      }
    });
  };

  return (
    <>
      <h1>Login Page</h1>;
      <form onSubmit={handleLoginSubmit}>
        <Container spacing={2} maxWidth="sm">
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
          <Stack spacing={2} paddingBottom={2}>
            <TextField label="Login ID" name="loginId" />
            <TextField label="Password" name="password" />
          </Stack>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Container>
      </form>
    </>
  );
};

export default LoginPage;
