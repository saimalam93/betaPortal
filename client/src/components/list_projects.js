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
import viewAllProjects from "../graphql/viewAllProjects";

const List_Projects = (props) => {
  const url = "http://localhost:4000/graphql";
  const [projects, setProjects] = useState([]);

  let filters = {};

  useEffect(() => {
    loadData(filters);
  }, []);

  const loadData = (filters) => {
    viewAllProjects(url, filters).then((result) => {
      setProjects(result.data.viewAllProjects);
    });
  }; // end of loadData

  return (
    <Container maxWidth={false}>
      <h1 align="center">All Projects</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#1D7874", color: "white" }}>
              <TableCell style={{ color: "#ffffff" }}>Project Number</TableCell>
              <TableCell style={{ color: "#ffffff" }}>Project Name</TableCell>
              <TableCell style={{ color: "#ffffff" }}>Project Type</TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                Project Description
              </TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                Project Cost
              </TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                Project Client
              </TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                Project Status
              </TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                Project Manager
              </TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                Project Start Date
              </TableCell>

              <TableCell style={{ color: "#ffffff" }} align="right">
                Project End Date
              </TableCell>
              <TableCell style={{ color: "#ffffff" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {project.projectNum}
                </TableCell>
                <TableCell component="th" scope="row">
                  {project.projectName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {project.projectType}
                </TableCell>
                <TableCell align="right">
                  {project.projectDescription}
                </TableCell>
                <TableCell align="right">{project.projectCost}</TableCell>
                <TableCell align="right">{project.projectClient}</TableCell>
                <TableCell align="right">{project.projectStatus}</TableCell>
                <TableCell align="right">
                  {project.projectManager.fname} {project.projectManager.lname}
                </TableCell>
                <TableCell align="right">
                  {moment(project.startDate).utc().format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="right">
                  {moment(project.endDate).utc().format("DD/MM/YYYY")}
                </TableCell>

                <TableCell align="right">
                  <Link
                    to={`/editproject/${project._id}`}
                    className="btn btn-primary"
                  >
                    <IconButton aria-label="edit" size="large">
                      <EditIcon
                        style={{ fill: "#00A86B" }}
                        fontSize="inherit"
                      />
                    </IconButton>
                  </Link>
                  <Link
                    to={`/deleteproject/${project._id}`}
                    className="btn btn-primary"
                  >
                    <IconButton aria-label="delete" size="large">
                      <DeleteIcon
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

export default List_Projects;
