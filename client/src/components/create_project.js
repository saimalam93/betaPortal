import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Grid from "@mui/system/Unstable_Grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import addNewProject from "../graphql/addNewProject";
import viewAllEmployees from "../graphql/viewAllEmployees";

const Create_Project = () => {
  const url = "https://betaportal-saimalam.onrender.com/graphql";
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
  };

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

  const handleChange = (event) => {
    setProject({ ...project, [event.target.name]: event.target.value });
  };

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
          <Box>
            <Grid
              container
              direction="column"
              justifyContent="center"
              spacing={3}
            >
              <Grid>
                <center>
                  <h1>Create A New Project </h1>
                </center>
              </Grid>
              <Grid xs>
                <TextField
                  label="Project Name"
                  type="text"
                  name="projectName"
                  value={project.projectName}
                  onChange={handleChange}
                  required
                  sx={{
                    width: "100%",
                  }}
                />
              </Grid>
              <Grid xs>
                <TextField
                  label="Project Type"
                  type="text"
                  name="projectType"
                  value={project.projectType}
                  onChange={handleChange}
                  sx={{
                    width: "100%",
                  }}
                />
              </Grid>
              <Grid xs>
                <TextField
                  label="Project Description"
                  type="text"
                  name="projectDescription"
                  value={project.projectDescription}
                  onChange={handleChange}
                  sx={{
                    width: "100%",
                  }}
                />
              </Grid>
              <Grid xs>
                <TextField
                  label="Project Cost"
                  type="text"
                  name="projectCost"
                  value={project.projectCost}
                  onChange={handleChange}
                  sx={{
                    width: "100%",
                  }}
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
                  sx={{
                    width: "100%",
                  }}
                />
              </Grid>
              <Grid xs>
                <TextField
                  label="Project Status"
                  type="text"
                  name="projectStatus"
                  value={project.projectStatus}
                  onChange={handleChange}
                  sx={{
                    width: "100%",
                  }}
                />
              </Grid>

              <Box sx={{ padding: "1.5%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Project Manager
                  </InputLabel>
                  <Select
                    labelId="Project Manager"
                    name="projectManager"
                    value={project.projectManager}
                    label="Project Manager"
                    onChange={handleChange}
                    fullWidth
                    sx={{
                      margin: "0 5px",
                      width: "98%",
                    }}
                  >
                    {managers.map((manager) => (
                      <MenuItem key={manager._id} value={manager._id}>
                        {manager.fname} {manager.lname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Grid xs>
                <TextField
                  label="Start Date"
                  type="date"
                  name="startDate"
                  value={project.startDate}
                  onChange={handleChange}
                  sx={{
                    width: "100%",
                    "@media (min-width: 780px)": {
                      width: "100%",
                    },
                  }}
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
                  sx={{
                    width: "100%",
                    "@media (min-width: 780px)": {
                      width: "100%",
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid>
                <center>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ width: 200, height: 50, background: "#1D7874" }}
                  >
                    ADD
                  </Button>
                </center>
              </Grid>
            </Grid>
          </Box>
        </form>
      </div>
    </Container>
  );
};
export default Create_Project;
