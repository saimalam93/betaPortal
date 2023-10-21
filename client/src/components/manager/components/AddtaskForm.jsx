import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { InputLabel, Select, MenuItem, Typography, Card, FormControl, TextField, Button } from '@material-ui/core';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import addNewProject from "../../../graphql/addNewProject";
import viewAllEmployees from "../../../graphql/viewAllEmployees";



export default function TaskForReviewList() {
  const url = "https://betaportal-saimalam.onrender.com/graphql";
  const navigate = useNavigate();
  const [employees, setemployee] = useState([]);

  useEffect(() => {
    loadData(filters);
  }, []);

  const loadData = (filters) => {
    viewAllEmployees(url, { filters }).then((result) => {
      let data = setemployee(result.data.viewAllEmployees);
    });

  };
  let filters = { role: "Employee" };





  const [project, setProject] = useState({
    projectNum: "",
    projectName: "",
    projectDescription: "",
    projectEmpolyee: [],
    endDate: "",
  });

  const successfulNotify = () => (
    <div>
      <p> Added New Task!</p>
      {/* <Link to="/toasttest">Go to Task Dashborad</Link> */}
    </div>
  );
  const errorlNotify = () => (
    <div>
      <p> An error occurred</p>
    </div>
  );

  const handleChange = (event) => {
    setProject({ ...project, [event.target.name]: event.target.value });

  };

  const submit = async (e) => {
    e.preventDefault();
    setProject({
      projectNum: "",
      projectName: "",
      projectDescription: "",
      projectEmpolyee: [],
      endDate: "",
    });
    if (project.projectEmpolyee === "") {
      project.projectEmpolyee = null;
    }

    try {

      const result = await addNewProject(url, { project });
      if (result && result.data && result.data.addNewProject) {
        setProject(result.data.addNewProject);
    } else {
        console.error("Unexpected structure for result:", result);
    }

     // toast.info(successfulNotify);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error);
      toast.error(errorlNotify);
      // Display an error message or take appropriate action
    }
  };

  return (
    <Card>
      <Typography variant="subtitle1" component="body1"> Add task</Typography>
      <form onSubmit={submit}>
        <TextField
          required
          style={{ width: '100%', margin: "5px" }}
          id="filled-basic"
          type="text"
          label="title"
          variant="filled"
          name="projectName"
          value={project.projectName}
          onChange={handleChange}
          InputProps={{ disableUnderline: true }}
        />
        <br />

        <div style={{ display: 'flex', width: '100%' }}>
          <FormControl style={{ width: '50%' }} required>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ margin: "5px", backgroundColor: '#f8fafc' }}
                name="endDate"
                value={project.endDate}
                variant="filled" label="Deadline" InputProps={{
                  disableUnderline: true,
                }}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl style={{ width: '50%' }}>
            <InputLabel>Select Empolyee</InputLabel>
            <Select
              value={project.projectEmpolyee}
              defaultValue=''
              label="Select Empolyee"
              onChange={handleChange}
              name="projectEmpolyee"
            >
              {employees.map((employee) => (
                <MenuItem key={employee._id} value={employee._id}>
                  {employee.fname} {employee.lname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </div>

        <br />
        <TextField
          type="text"
          label="Description"
          name="projectDescription"
          variant="filled"
          value={project.projectDescription}
          onChange={handleChange}
          InputProps={{
            disableUnderline: true,
            style: { height: 300 }
          }}
          style={{ width: "100%", margin: "5px" }}

        />
        <div style={{
          paddingTop: '1rem'
        }}>


          <Button type="submit" variant="contained">
            Save
          </Button>
          <ToastContainer />
        </div>
      </form>

    </Card>

  );
}