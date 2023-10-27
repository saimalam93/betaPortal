import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import createTask from "../../../graphql/createTask";
import viewAllEmployees from "../../../graphql/viewAllEmployees";

const ITEM_HEIGHT = "3rem";
const MenuProps = {
  PaperProps: {
    style: {
      marginTop: ITEM_HEIGHT,
      width: 250,
    },
  },
  getContentAnchorEl: () => null,
};

export default function AddTaskForm({ tasks, setTasks }) {
  const url = "http://localhost:4000/graphql";
  const [employees, setemployee] = useState([]);
  const [endDate, setEndDate] = useState();

  const filters = {
    role: "Employee",
  };

  useEffect(() => {
    loadData(filters);
  }, []);

  const loadData = (filters) => {
    viewAllEmployees(url, { filters }).then((result) => {
      setemployee(result.data.viewAllEmployees);
    });
  };

  const [task, setTask] = useState({
    taskName: "",
    taskDescription: "",
    taskEmployee: "",
    endDate: "",
  });

  const successfulNotify = () => (
    <div>
      <p> Added New Task!</p>
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

  const handleDateChange = (e) => {
    setEndDate(e.$d);
    setTask({ ...task, endDate: e.$d });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (task.taskEmployee === "") {
      throw new Error("Please select Employee");
    }

    try {
      await createTask(url, { task }).then((result) => {
        setTasks([...tasks, result.data.createTask]);
        toast.info(successfulNotify);
      });
      setTask({
        taskName: "",
        taskDescription: "",
        taskEmployee: "",
        endDate: "",
      });
      setEndDate(null);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error);
      toast.error(errorlNotify);
      // Display an error message or take appropriate action
    }
  };

  return (
    <Card>
      <Typography variant="subtitle1" component="body1">
        Add task
      </Typography>
      <form onSubmit={submit}>
        <Grid container>
          <Grid xs={12}>
            <TextField
              required
              style={{ width: "100%", margin: "5px" }}
              id="filled-basic"
              type="text"
              label="Task Title"
              variant="filled"
              name="taskName"
              value={task.taskName}
              onChange={handleChange}
              InputProps={{ disableUnderline: true }}
            />
          </Grid>

          <Grid md={6} sm={12}>
            <FormControl style={{ width: "100%" }} required>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ margin: "5px", backgroundColor: "#f8fafc" }}
                  value={endDate}
                  onChange={handleDateChange}
                  variant="filled"
                  label="End Date"
                  disablePast
                  InputProps={{
                    disableUnderline: true,
                  }}
                  className="datepicker"
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid md={6} sm={12}>
            <FormControl style={{ width: "100%" }} required>
              <InputLabel>Select Empolyee</InputLabel>
              <Select
                value={task.taskEmployee}
                defaultValue=""
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
                style: { height: 300 },
              }}
              style={{ width: "100%", margin: "5px" }}
            />
          </Grid>
        </Grid>

        <div
          style={{
            paddingTop: "1rem",
          }}
        >
          <Button type="submit" variant="contained">
            Save
          </Button>
          <ToastContainer />
        </div>
      </form>
    </Card>
  );
}
