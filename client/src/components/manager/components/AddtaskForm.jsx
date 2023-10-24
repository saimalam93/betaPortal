import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Box, Chip, InputLabel, Grid, Select, MenuItem, Typography, Card, FormControl, TextField, Button } from '@material-ui/core';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'

import viewAllEmployees from "../../../graphql/viewAllEmployees";



export default function TaskForReviewList() {
  const url = "https://betaportal-saimalam.onrender.com/graphql";
  const navigate = useNavigate();
  const [employees, setemployee] = useState([]);
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    loadData(filters);
  }, []);

  const loadData = (filters) => {
    viewAllEmployees(url, { filters }).then((result) => {
      setemployee(result.data.viewAllEmployees);
    });

  };
  let filters = {};


  const [task, setTask] = useState({
    taskName: "",
    taskDescription: "",
    taskEmployee: "",
    endDate: null,
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
    setTask({ ...task, [event.target.name]: event.target.value });

  };

  const handleDateChange =(e, date) => {
    setEndDate(e.$d);
    setTask({ ...task, endDate: e.$d });
  }



  const submit = async (e) => {
    e.preventDefault();
    console.log(task);

    if (task.taskEmployee === "") {
      throw new Error("Please select Employee");
    }

    // try {

    //   const result = await addNewTask(url, { task });
    //   if (result && result.data && result.data.addNewTask) {
    //     setTask(result.data.addNewTask);
    //     toast.info(successfulNotify);
    //   } else {
    //     console.error("Unexpected structure for result:", result);
    //     toast.error(errorlNotify);
    //   }
    setTask({
      taskName: "",
      taskDescription: "",
      taskEmployee: "",
      endDate: "",
    });
    setEndDate(null);
    // } catch (error) {
    //   // Handle the error here
    //   console.error("An error occurred:", error);
    //   toast.error(errorlNotify);
    //   // Display an error message or take appropriate action
    // }
  };


  const ITEM_HEIGHT = '3rem';
  const ITEM_PADDING_TOP = '8px';
  const MenuProps = {
    PaperProps: {
      style: {
        marginTop: ITEM_HEIGHT,
        width: 250,
      },
    },
    getContentAnchorEl: () => null,
  };

  return (
    <Card>
      <Typography variant="subtitle1" component="body1"> Add task</Typography>
      <form onSubmit={submit}>
        <Grid container>
          <Grid xs={12}>
            <TextField
              required
              style={{ width: '100%', margin: "5px" }}
              id="filled-basic"
              type="text"
              label="title"
              variant="filled"
              name="taskName"
              value={task.taskName}
              onChange={handleChange}
              InputProps={{ disableUnderline: true }}
            />
          </Grid>

          <Grid md={6} sm={12}>
            <FormControl style={{ width: '100%' }} required>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ margin: "5px", backgroundColor: '#f8fafc' }}
                  value={endDate}
                  onChange={handleDateChange}
                  variant="filled"
                  label="End Date"
                  disablePast
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid md={6} sm={12}>
            <FormControl style={{ width: '100%' }}>
              <InputLabel>Select Empolyee</InputLabel>
              <Select
                // not yet add the taskEmpolyee query

                value={task.taskEmployee}
                defaultValue=''
                label="Select Empolyee"
                onChange={handleChange}
                name="taskEmployee"
                MenuProps={MenuProps}
              >
                {employees.map((employee) => (
                  <MenuItem key={employee._id} value={employee._id}>
                    {employee.fname} {employee.lname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={12}>
            <TextField
              type="text"
              label="Description"
              name="taskDescription"
              variant="filled"
              value={task.taskDescription}
              onChange={handleChange}
              InputProps={{
                disableUnderline: true,
                style: { height: 300 }
              }}
              style={{ width: "100%", margin: "5px" }}

            />
          </Grid>
        </Grid>

        <div style={{
          paddingTop: '1rem'
        }}>
          <Button type="submit" variant="contained">
            Save
          </Button>
          <ToastContainer />
        </div>
      </form>

    </Card >

  );
}