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
import deleteRequest from "../graphql/deleteRequest";
import viewSingleRequest from "../graphql/viewSingleRequest";

const Delete_Project = (props) => {
  const url = "https://betaportal-saimalam.onrender.com/graphql";
  const navigate = useNavigate();
  const [request, setRequest] = useState([]);
  const [employee, setEmployee] = useState({});
  const { _id } = useParams();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    viewSingleRequest(url, { _id }).then((result) => {
      const { employee, ...request } = {
        ...result.data.viewSingleRequest,
      };
      setRequest(request);
      setEmployee(employee);
    });
  }; // end of loadData

  const handleChange = (event) => {
    setRequest({ ...request, [event.target.name]: event.target.value });
  };

  const submit = (e) => {
    deleteRequest(url, { _id }).then((result) => {
      setRequest(result.data.deleteRequest);
      navigate("/listrequest");
    });
  };

  return (
    <div>
      <h1 align="center">Delete Project</h1>

      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: "#1D7874", color: "white" }}>
                <TableCell style={{ color: "#ffffff" }}>
                  Request Number
                </TableCell>
                <TableCell style={{ color: "#ffffff" }}>
                  Request Subject
                </TableCell>
                <TableCell style={{ color: "#ffffff" }}>Reason</TableCell>
                <TableCell style={{ color: "#ffffff" }} align="right">
                  Request Status
                </TableCell>
                <TableCell style={{ color: "#ffffff" }} align="right">
                  Start Date
                </TableCell>
                <TableCell style={{ color: "#ffffff" }} align="right">
                  End Date
                </TableCell>
                <TableCell style={{ color: "#ffffff" }} align="right">
                  Created At
                </TableCell>
                <TableCell style={{ color: "#ffffff" }} align="right">
                  Updated At
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={request._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {request.request_subject}
                </TableCell>
                <TableCell component="th" scope="row">
                  {employee.fname} {employee.lname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {request.request_status}
                </TableCell>
                <TableCell component="th" scope="row">
                  {request.reason}
                </TableCell>
                <TableCell align="right">
                  {moment(request.startDate).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="right">
                  {moment(request.endDate).format("DD/MM/YYYY")}
                </TableCell>
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
              navigate("/listproject");
            }}
          >
            Cancel
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default Delete_Project;
