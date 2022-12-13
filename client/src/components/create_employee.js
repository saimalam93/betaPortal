import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/system/Unstable_Grid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import addNewEmployee from "../graphql/addNewEmployee";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";

const Create_Employee = () => {
  const url = "http://localhost:4000/graphql";
  const navigate = useNavigate();

  const [employee, setemployee] = useState({
    fname: "",
    lname: "",
    address: "",
    mobile: "",
    emergencyContact: "",
    email: "",
    dateOfBirth: "",
    dateOfJoining: "",
    role: "",
    currentStatus: "",
    sin: "",
  });

  const handleChange = (event) => {
    setemployee({ ...employee, [event.target.name]: event.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    setemployee({
      fname: "",
      lname: "",
      address: "",
      mobile: "",
      emergencyContact: "",
      email: "",
      dateOfBirth: "",
      dateOfJoining: "",
      role: "",
      currentStatus: "",
      sin: "",
    });
    console.log(employee);
    let newEmployee = employee;

    addNewEmployee(url, { newEmployee }).then((result) => {
      console.log("result:", result);
      setemployee(result.data.addNewEmployee);
      navigate("/listemployee");
    });
  };



  return (
    <Container component="main" maxWidth="xs">

      <div>
        <form onSubmit={submit}>
          <Box
          
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              spacing={3}
            >
              <Grid>
                <center><h1>ADD NEW EMPLOYEE DETAILS</h1></center>
              </Grid>
              <Grid xs>
                <TextField
                  label="First Name"
                  type="text"
                  name="fname"
                  value={employee.fname}
                  onChange={handleChange}
                  sx={{
                    width: '100%'
                  }}
                />
              </Grid>
              <Grid xs>
                <TextField
                  label="Last Name"
                  type="text"
                  name="lname"
                  value={employee.lname}
                  onChange={handleChange}
                  sx={{
                    width: '100%'
                  }}
                />
              </Grid>
              <Grid xs>
                <TextField
                  label="Address"
                  type="text"
                  name="address"
                  value={employee.address}
                  onChange={handleChange}
                  sx={{
                    width: '100%'
                  }}
                />
              </Grid>
              <Grid xs>
                <TextField
                  label="Mobile Number"
                  type="text"
                  name="mobile"
                  value={employee.mobile}
                  onChange={handleChange}
                  sx={{
                    width: '100%'
                  }}
                />
              </Grid>
              <Grid xs>
                <TextField
                  label="Emergency Contact"
                  type="text"
                  name="emergencyContact"
                  value={employee.emergencyContact}
                  onChange={handleChange}
                  sx={{
                    width: '100%'
                  }}
                />
              </Grid>
              <Grid xs>
                <TextField
                  label="Email"
                  type="text"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  sx={{
                    width: '100%'
                  }}
                />
              </Grid>
              <Grid xs>
                <TextField
                  label="Date of Birth"
                  type="date"
                  name="dateOfBirth"
                  value={employee.dateOfBirth}
                  onChange={handleChange}
                  sx={{
                    width: '100%',
                    '@media (min-width: 780px)': {
                      width: '100%'
                    }
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="role">Role</InputLabel>
                    <Select
                      labelId="role"
                      label="Role"
                      name="role"
                      onChange={handleChange}
                      sx={{
                        width: '100%'
                      }}
                    >
                      <MenuItem value={"Admin"}>Administrator</MenuItem>
                      <MenuItem value={"Director"}>Director</MenuItem>
                      <MenuItem value={"Manager"}>Manager</MenuItem>
                      <MenuItem value={"Employee"}>Employee</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid xs>
                <TextField
                  label="Date Of Joining"
                  type="date"
                  name="dateOfJoining"
                  value={employee.dateOfJoining}
                  onChange={handleChange}
                  sx={{
                    width: '100%',
                    '@media (min-width: 780px)': {
                      width: '100%'
                    }
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid xs>
                <TextField
                  label="Current Status"
                  type="text"
                  name="currentStatus"
                  value={employee.currentStatus}
                  onChange={handleChange}
                  sx={{
                    width: '100%'
                  }}
                />
              </Grid>
              <Grid xs>
                <TextField
                  label="SIN Number"
                  type="text"
                  name="sin"
                  value={employee.sin}
                  onChange={handleChange}
                  sx={{
                    width: '100%'
                  }}
                />
              </Grid>
              <Grid>
                <center><Button
                  type="submit"
                  variant="contained"
                  style={{ width: 200, height: 50, background: "#1D7874" }}
                >
                  ADD
                </Button></center>
              </Grid>
            </Grid>
          </Box>
        </form>
      </div>
    </Container>
  );
};
export default Create_Employee;
