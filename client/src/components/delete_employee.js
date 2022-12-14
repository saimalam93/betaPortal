import DeleteIcon from "@mui/icons-material/Delete";
import NotInterested from "@mui/icons-material/NotInterested";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import deleteEmployee from "../graphql/deleteEmployee";
import viewSingleEmployee from "../graphql/viewSingleEmployee";

const Delete_Employee = (props) => {
  const url = "https://betaportal-saimalam.onrender.com/graphql";
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const { _id } = useParams();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    viewSingleEmployee(url, { _id }).then((result) => {
      setEmployee(result.data.viewSingleEmployee);
    });
  };

  const handleChange = (event) => {
    setEmployee({ ...employee, [event.target.name]: event.target.value });
  };

  const submit = (e) => {
    deleteEmployee(url, { _id }).then((result) => {
      setEmployee(result.data.deleteEmployee);
      navigate("/listemployee");
    });
  };

  return (
    <div>
      <h1 align="center">Delete Employee Details</h1>

      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: "#1D7874", color: "white" }}>
                <TableCell style={{ color: "#ffffff" }}>First Name</TableCell>
                <TableCell style={{ color: "#ffffff" }}>Last Name</TableCell>
                <TableCell style={{ color: "#ffffff" }} align="right">
                  Date Of Joining
                </TableCell>
                <TableCell style={{ color: "#ffffff" }} align="right">
                  Date Of Birth
                </TableCell>
                <TableCell style={{ color: "#ffffff" }} align="right">
                  Sin
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={employee._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {employee.fname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {employee.lname}
                </TableCell>
                <TableCell align="right">
                  {moment(employee.dateOfJoining).utc().format("Do MMMM YYYY")}
                </TableCell>
                <TableCell align="right">
                  {moment(employee.dateOfBirth).utc().format("Do MMMM YYYY")}
                </TableCell>
                <TableCell align="right">{employee.sin}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <div>
        <Stack m={2} justifyContent="center" direction="row" spacing={2}>
          <Button
            style={{
              backgroundColor: "#8D021F",
            }}
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={submit}
          >
            Confirm
          </Button>
          <Button
            style={{
              backgroundColor: "#1D7874",
            }}
            variant="contained"
            startIcon={<NotInterested />}
            onClick={() => {
              navigate("/listemployee");
            }}
          >
            Cancel
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default Delete_Employee;
