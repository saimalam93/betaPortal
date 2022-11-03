import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Grid from "@mui/system/Unstable_Grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import addNewProject from "../graphql/addNewProject";
import viewAllEmployees from "../graphql/viewAllEmployees";

// create a new project

const Create_Project = () => {
  const url = "http://localhost:4000/graphql";
  const navigate = useNavigate();
  const [managers, setManagers] = useState([]);

  let filters = { role: "Manager" };

  useEffect(() => {
    loadData(filters);
  }, []);

  const loadData = (filters) => {
    viewAllEmployees(url, { filters }).then((result) => {
      setManagers(result.data.viewAllEmployees);
    });
  }; // end of loadData

  const [project, setProject] = useState({
    projectNum: "",
    projectName: "",
    projectType: "",
    projectDescription: "",
    projectCost: "",
    projectClient: "",
    projectStatus: "",
    projectManager: "",
    startDate: "",
    endDate: "",
  });

  // handle change function
  const handleChange = (event) => {
    setProject({ ...project, [event.target.name]: event.target.value });
  };

  // handle submit function
  const submit = (e) => {
    e.preventDefault();
    setProject({
      projectNum: "",
      projectName: "",
      projectType: "",
      projectDescription: "",
      projectCost: "",
      projectClient: "",
      projectStatus: "",
      projectManager: "",
      startDate: "",
      endDate: "",
    });
    if (project.projectManager === "") {
      project.projectManager = null;
    }
    addNewProject(url, { project }).then((result) => {
      setProject(result.data.addNewProject);
      navigate("/listproject");
    });
  };

  return (
    <Container component="main" maxWidth="xs">
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
                <h1>Create A New Project </h1>
              </Grid>
              <Grid xs>
                <TextField
                  label="Project Name"
                  type="text"
                  name="projectName"
                  value={project.projectName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid xs>
                <TextField
                  label="Project Type"
                  type="text"
                  name="projectType"
                  value={project.projectType}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs>
                <TextField
                  label="Project Description"
                  type="text"
                  name="projectDescription"
                  value={project.projectDescription}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs>
                <TextField
                  label="Project Cost"
                  type="text"
                  name="projectCost"
                  value={project.projectCost}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs>
                <TextField
                  label="Project Client"
                  type="text"
                  name="projectClient"
                  value={project.projectClient}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid xs>
                <TextField
                  label="Project Status"
                  type="text"
                  name="projectStatus"
                  value={project.projectStatus}
                  onChange={handleChange}
                />
              </Grid>
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
                  sx={{ margin: "0 25px" }}
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
                  label="Start Date"
                  type="date"
                  name="startDate"
                  value={project.startDate}
                  onChange={handleChange}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid xs>
                <TextField
                  label="End Date"
                  type="date"
                  name="endDate"
                  value={project.endDate}
                  onChange={handleChange}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ width: 200, height: 50, background: "#1D7874" }}
                >
                  ADD
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </div>
    </Container>
  );
};
export default Create_Project;
