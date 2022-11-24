import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
import { Link, useNavigate } from "react-router-dom";
import viewAllRequests from "../graphql/viewAllRequests";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const List_Requests = (props) => {
  const url = "http://localhost:4000/graphql";
  const [requests, setRequests] = useState([]);

  let filters = {};

  useEffect(() => {
    loadData(filters);
  }, []);

  const loadData = (filters) => {
    viewAllRequests(url, filters).then((result) => {
      setRequests(result.data.viewAllRequests);
      console.log(result);
    });
  }; // end of loadData

  return (
    <Container maxWidth={false}>
      <h1 align="center">All Requests</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#1D7874", color: "white" }}>
              {/* <TableCell style={{ color: "#ffffff" }}>Request Number</TableCell> */}
              <TableCell style={{ color: "#ffffff" }}>Request Subject</TableCell>
              <TableCell style={{ color: "#ffffff" }}>Reason</TableCell>
              <TableCell style={{ color: "#ffffff" }}>Request Status</TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                Employee Name
              </TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                Start Date
              </TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                End Date
              </TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow
                key={request._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {request.request_subject}
                </TableCell>
                <TableCell component="th" scope="row">
                  {request.reason}
                </TableCell>
                <TableCell component="th" scope="row">
                  {request.request_status}
                </TableCell>
                <TableCell align="right">
                  {request.employee.fname} {request.employee.lname}
                </TableCell>
                <TableCell align="right">
                  {moment(request.startDate).utc().format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="right">
                  {moment(request.endDate).utc().format("DD/MM/YYYY")}
                </TableCell>


                <TableCell align="right">
                  <Link
                    to={`/editrequest/${request.id}`}
                    className="btn btn-primary"
                  >
                    <IconButton aria-label="edit" size="large">
                      <ThumbUpIcon
                        style={{ fill: "#00A86B" }}
                        fontSize="inherit"
                      />
                    </IconButton>
                  </Link>
                  <Link
                    to={`/deleterequest/${request.id}`}
                    className="btn btn-primary"
                  >
                    <IconButton aria-label="delete" size="large">
                      <ThumbDownAltIcon
                        style={{ fill: "#8D021F" }}
                        fontSize="inherit"
                      />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default List_Requests;
