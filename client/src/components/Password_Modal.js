import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/system/Unstable_Grid";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import updatePassword from "../graphql/updatePassword";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Password_Modal(props) {
  const url = "https://betaportal-saimalam.onrender.com/graphql";

  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(props.open);
  const handleClose = () => props.handleClose();

  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlechangeSubmit = (e) => {
    e.preventDefault();
    let password = input.password;
    let confirmPassword = input.confirmPassword;
    let localeError = false;
    let employee = {};
    if (!password) {
      localeError = true;
      setError(true);
      setErrorMessage("Please enter Password.");
    } else if (!confirmPassword) {
      localeError = true;
      setError(true);
      setErrorMessage("Please enter Confirm Password.");
    } else if (password !== confirmPassword) {
      localeError = true;
      setError(true);
      setErrorMessage("Password and Confirm Password does not match.");
    } else {
      localeError = false;
      setError(false);
      setErrorMessage("");
    }

    if (!localeError) {
      let password = input.password;
      employee = {
        loginID: user.loginID,
        password: password,
      };

      updateUserPassword(employee);
    }
  };

  const updateUserPassword = (employee) => {
    updatePassword(url, { employee }).then((result) => {
      if (result.data.updatePassword) {
        handleClose();
      } else {
        setError(true);
        setErrorMessage("Failed");
      }
    });
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            onSubmit={handlechangeSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <Grid>
                <Paper elevation={24}>
                  <h1 style={{ color: "#9db384" }}>Change Password</h1>
                </Paper>
              </Grid>
              <Grid>
                {error && <Alert severity="error">{errorMessage}</Alert>}
              </Grid>
              <Grid xs>
                <TextField
                  label="Enter New Password"
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid xs>
                <TextField
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter Confirm Password"
                  value={input.confirmPassword}
                  onChange={onInputChange}
                />
              </Grid>
              <Button
                type="submit"
                variant="contained"
                style={{ width: 200, height: 50, background: "#1D7874" }}
              >
                Submit
              </Button>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
