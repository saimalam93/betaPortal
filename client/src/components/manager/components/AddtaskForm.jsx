import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { MenuItem, Typography, Card, FormControl, TextField, Button } from '@material-ui/core';
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
    loadData();
  }, []);

  const loadData = () => {
    viewAllEmployees(url).then((result) => {
      setemployee(result.data.viewAllEmployees);
    });
  };

  const [project, setProject] = useState({
    projectNum: "",
    projectName: "",
    projectDescription: "",
    projecEmpolyee: [],
    endDate: "",
  });

  //const notify = () => toast("Wow so easy!");

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

  const submit = async(e) => {
    e.preventDefault();
    setProject({
      projectNum: "",
      projectName: "",
      projectDescription: "",
      projecEmpolyee: [],
      endDate: "",
    });
    if (project.projecEmpolyee === "") {
      project.projecEmpolyee = null;
    }

    try {
      const result = await addNewProject(url, { project });
      setProject(result.data.addNewProject);
      toast.info(successfulNotify);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error);
      toast.error(errorlNotify);
      // Display an error message or take appropriate action
    }
    console.log(setProject)
  };





  return (
    <Card>
      <Typography variant="subtitle1" component="body1"> Add task</Typography>
      <form onSubmit={submit}>
        <TextField
          required
          style={{ width:'100%', margin: "5px" }}
          id="filled-basic"
          type="text"
          label="title"
          variant="filled"
         // value={project.projectName}
          onChange={handleChange}
          InputProps={{ disableUnderline: true }}
        />
      <br />

      <div style={{ display: 'flex', width: '100%' }}>
        <FormControl style={{ width: '50%' }} required>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ margin: "5px", backgroundColor: '#f8fafc' }}
             // value={project.endDate}
              variant="filled" label="Deadline" InputProps={{
                disableUnderline: true,
              }}
            />
          </LocalizationProvider>
        </FormControl>

        <FormControl style={{ width: '50%' }} required>
        {employees.map((employee) => (
                      <MenuItem key={employee._id} value={employee._id}>
                        {employee.fname} {employee.lname}
                      </MenuItem>
                    ))}
        </FormControl>

      </div>

      <br />
      <TextField
        style={{ width: "100%", margin: "5px" }}
        type="text"
        label="Description"
        variant="filled"
        onChange={handleChange}
        InputProps={{
          disableUnderline: true,
          style: { height: 300 }
        }}
      //  value={project.projectDescription}
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