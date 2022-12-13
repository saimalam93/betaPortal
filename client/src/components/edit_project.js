import NotInterested from "@mui/icons-material/NotInterested";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
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
import updateProject from "../graphql/editProject";
import viewAllEmployees from "../graphql/viewAllEmployees";
import viewSingleProject from "../graphql/viewSingleProject";

const Edit_Project = (props) => {
  const url = "http://localhost:4000/graphql";
  const [project, setProject] = useState({});
  const [oldProject, setOldProject] = useState({});
  const [projectManager, setProjectManager] = useState({});
  const navigate = useNavigate();
  const { _id } = useParams();
  const [managers, setManagers] = useState([]);
  let filters = { role: "Manager" };

  useEffect(() => {
    loadData(filters);
  }, []);

  const loadData = (filters) => {
    viewSingleProject(url, { _id }).then((result) => {
      const { projectManager, ...project } = {
        ...result.data.viewSingleProject,
      };
      setOldProject(project);
      setProjectManager(projectManager);
    });
    viewAllEmployees(url, { filters }).then((result) => {
      setManagers(result.data.viewAllEmployees);
    });
  }; // end of loadData

  const handleChange = (event) => {
    setProject({ ...project, [event.target.name]: event.target.value });
    setOldProject({ ...oldProject, [event.target.name]: event.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    project._id = _id;
    updateProject(url, { project }).then((result) => {
      setProject(result.data.updateProject);
      navigate("/listproject");
    });
  };

  return (
    <div>
      <h1 align="center">Project Update </h1>

      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: "#1D7874", color: "white" }}>
                <TableCell style={{ color: "#ffffff" }}>
                  Project Manager
                </TableCell>

                <TableCell style={{ color: "#ffffff" }} align="right">
                  Start Date
                </TableCell>
                <TableCell style={{ color: "#ffffff" }} align="right">
                  End Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={oldProject._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {projectManager.fname} {projectManager.lname}
                </TableCell>
                <TableCell align="right">
                  {moment(oldProject.startDate).utc().format("Do MMMM YYYY")}
                </TableCell>
                <TableCell align="right">
                  {moment(oldProject.endDate).utc().format("Do MMMM YYYY")}
                </TableCell>
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
              <Box sx={{ minWidth: 430, margin: "0" }}>
                <InputLabel id="Project Manager" sx={{ margin: "0 25px" }}>
                  Project Manager
                </InputLabel>
                <Select
                  labelId="Project Manager"
                  name="projectManager"
                  value={project.projectManager}
                  label="Project Manager"
                  onChange={handleChange}
                  fullWidth
                >
                  {managers.map((manager) => (
                    <MenuItem key={manager._id} value={manager._id}>
                      {manager.fname} {manager.lname}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Grid xs>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Start Date"
                  type="date"
                  name="startDate"
                  value={oldProject.StartDate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="End Date"
                  type="date"
                  name="endDate"
                  value={oldProject.endDate}
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
                      navigate("/listproject");
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

export default Edit_Project;
