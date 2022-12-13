import NotInterested from "@mui/icons-material/NotInterested";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import updateEmployee from "../graphql/editEmployee";
import viewSingleEmployee from "../graphql/viewSingleEmployee";

const Edit_Employee = (props) => {
  const url = "http://localhost:4000/graphql";
  const [employee, setEmployee] = useState({});
  const [oldEmp, setOldEmp] = useState({});
  const navigate = useNavigate();
  const { _id } = useParams();
  let filters = {};

  useEffect(() => {
    loadData(filters);
  }, []);

  const loadData = (filters) => {
    viewSingleEmployee(url, { _id }).then((result) => {
      setOldEmp(result.data.viewSingleEmployee);
    });
  };

  const handleChange = (event) => {
    setEmployee({ ...employee, [event.target.name]: event.target.value });
    setOldEmp({ ...oldEmp, [event.target.name]: event.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    employee._id = _id;
    updateEmployee(url, { employee }).then((result) => {
      setEmployee(result.data.updateEmployee);
      navigate("/listemployee");
    });
  };

  return (
    <div>
      <h1 align="center">Employee Update</h1>

      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: "#1D7874", color: "white" }}>
                <TableCell style={{ color: "#ffffff" }}>Employee ID</TableCell>
                <TableCell style={{ color: "#ffffff" }}>First Name</TableCell>
                <TableCell style={{ color: "#ffffff" }}>Last Name</TableCell>
                <TableCell style={{ color: "#ffffff" }} align="right">
                  Date Of Joining
                </TableCell>
                <TableCell style={{ color: "#ffffff" }} align="right">
                  Date Of Birth
                </TableCell>
                <TableCell style={{ color: "#ffffff" }} align="right">
                  Mobile
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={oldEmp._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {oldEmp.loginID}
                </TableCell>
                <TableCell component="th" scope="row">
                  {oldEmp.fname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {oldEmp.lname}
                </TableCell>
                <TableCell align="right">
                  {moment(oldEmp.dateOfJoining).utc().format("Do MMMM YYYY")}
                </TableCell>
                <TableCell align="right">
                  {moment(oldEmp.dateOfBirth).utc().format("Do MMMM YYYY")}
                </TableCell>
                <TableCell align="right">{oldEmp.mobile}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <div>
        <form onSubmit={submit}>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" },
              flexGrow: 1,
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <Grid>
                <h1>EDIT EMPLOYEE DEATILS</h1>
              </Grid>
              <Grid xs>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Address"
                  type="text"
                  name="address"
                  value={oldEmp.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="SIN"
                  type="text"
                  name="sin"
                  value={oldEmp.sin}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Emergency Contact"
                  type="text"
                  name="emergencyContact"
                  value={oldEmp.emergencyContact}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Email"
                  type="text"
                  name="email"
                  value={oldEmp.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Current Status"
                  type="text"
                  name="currentStatus"
                  value={oldEmp.currentStatus}
                  onChange={handleChange}
                />
              </Grid>
              <Grid>
                <Stack
                  m={2}
                  justifyContent="center"
                  direction="row"
                  spacing={2}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ width: 200, height: 50, background: "#1D7874" }}
                  >
                    UPDATE
                  </Button>
                  <Button
                    style={{ width: 200, height: 50, background: "#8D021F" }}
                    variant="contained"
                    startIcon={<NotInterested />}
                    onClick={() => {
                      navigate("/listemployee");
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Edit_Employee;
