import { Button, TextField } from "@mui/material";
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
    userData = {
      loginID: form.loginId.value,
      password: form.password.value,
    };
    login();
  };

  const login = async () => {
    let loggedInUserData = await loginUser(url, { userData }).then((result) => {
      return result.data.loginUser;
    });
    context.login(loggedInUserData);
    navigate("/");
  };

  return (
    <>
      <h1>Login Page</h1>;
      <form onSubmit={handleLoginSubmit}>
        <Container spacing={2} maxWidth="sm">
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
