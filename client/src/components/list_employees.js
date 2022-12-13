import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import resetPassword from "../graphql/resetPassword";
import viewAllEmployees from "../graphql/viewAllEmployees";

const List_Employees = (props) => {
  const url = "https://betaportal-saimalam.onrender.com/graphql";
  const [employees, setEmployees] = useState([]);
  const [success, setSuccess] = useState(false);

  let filters = {};

  useEffect(() => {
    loadData(filters);
  }, []);

  const loadData = (filters) => {
    viewAllEmployees(url, { filters }).then((result) => {
      setEmployees(result.data.viewAllEmployees);
    });
  };

  const resetUserPassword = (id) => {
    resetPassword(url, { id }).then((result) => {
      setSuccess(result.data.resetPassword);
    });
  };

  return (
    <Container maxWidth={false}>
      <h1 align="center">LIST OF ALL EMPLOYEES</h1>
      {success ? (
        <Alert severity="success">Password Reset Successfully!</Alert>
      ) : null}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#1D7874", color: "white" }}>
              <TableCell style={{ color: "#ffffff" }}>Employee ID</TableCell>
              <TableCell style={{ color: "#ffffff" }}>First Name</TableCell>
              <TableCell style={{ color: "#ffffff" }}>Last Name</TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                Mobile
              </TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                Date Of Joining
              </TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                Role
              </TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                Current Status
              </TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                Date Of Birth
              </TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                Emergency Contact
              </TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                Address
              </TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                SIN
              </TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow
                key={emp._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {emp.loginID}
                </TableCell>
                <TableCell component="th" scope="row">
                  {emp.fname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {emp.lname}
                </TableCell>
                <TableCell align="right">{emp.mobile}</TableCell>
                <TableCell align="right">
                  {moment(emp.dateOfJoining).utc().format("Do MMMM YYYY")}
                </TableCell>
                <TableCell align="right">{emp.role}</TableCell>
                <TableCell align="right">{emp.currentStatus}</TableCell>
                <TableCell align="right">
                  {moment(emp.dateOfBirth).utc().format("Do MMMM YYYY")}
                </TableCell>
                <TableCell align="right">{emp.emergencyContact}</TableCell>
                <TableCell align="right">{emp.address}</TableCell>
                <TableCell align="right">{emp.sin}</TableCell>
                <TableCell align="right">
                  <Link to={`/view/${emp._id}`} className="btn btn-primary">
                    <IconButton aria-label="preview" size="large">
                      <PreviewIcon
                        style={{ fill: "#6593F5" }}
                        fontSize="inherit"
                      />
                    </IconButton>
                  </Link>
                  <Link to={`/edit/${emp._id}`} className="btn btn-primary">
                    <IconButton aria-label="edit" size="large">
                      <EditIcon
                        style={{ fill: "#00A86B" }}
                        fontSize="inherit"
                      />
                    </IconButton>
                  </Link>
                  <Link to={`/delete/${emp._id}`} className="btn btn-primary">
                    <IconButton aria-label="delete" size="large">
                      <DeleteIcon
                        style={{ fill: "#8D021F" }}
                        fontSize="inherit"
                      />
                    </IconButton>
                  </Link>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setSuccess(false);
                      resetUserPassword(emp._id);
                    }}
                    variant="outlined"
                    color="error"
                  >
                    Reset Password
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default List_Employees;
