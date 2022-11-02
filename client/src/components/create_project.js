import React from "react";
import { useEffect, useState } from "react";
import addNewProject from "../graphql/addNewProject";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/system/Unstable_Grid";
import styled from "@mui/system/styled";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// create a new project

const Create_Project = () => {
  const url = "http://localhost:4000/graphql";
  const navigate = useNavigate();
  
  const [project, setProject] = useState({
    projectName: "",
    projectType: "",
    projectDescription: "",
    projectCost: "",
    projectClient: "",
    projectStatus: "",
    projectManager: "",
    startDate:"",
    endDate: "",
  });

  // handle change function
  const handleChange = (event) => {
    setProject({ ...project, [event.target.name]: event.target.value });
  };
  console.log(setProject);

  // handle submit function
  const submit = (e) => {
    e.preventDefault();
    setProject({
      projectName: "",
      projectType: "",
      projectDescription: "",
      projectCost: "",
      projectClient: "",
      projectStatus: "",
      projectManager: "",
      startDate:"",
      endDate:"",
    });
    console.log(project);
    let newProject = project;

    addNewProject(url, { newProject }).then((result) => {
      console.log("result:", result);
      setProject(result.data.addNewProject);
      navigate("/dashboard");
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
              <Grid xs>
                <TextField
                  label="Project Manager"
                  type="text"
                  name="projectManager"
                  value={project.projectManager}
                  onChange={handleChange}
                />
              </Grid>

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
