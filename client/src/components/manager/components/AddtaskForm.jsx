import React from 'react';
// import {makeStyles} from '@material-ui/core/styles';
import { Typography,Card, FormControl, TextField, Button } from '@material-ui/core';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



export default function TaskForReviewList() {

  return (
    <Card>
      <Typography variant="subtitle1" component="body1"> Add task</Typography>

      <FormControl style={{ width: "100%" }}>
        <TextField
          style={{ margin: "5px" }}
          id="filled-basic"
          type="text"
          label="title"
          variant="filled"
          InputProps={{ disableUnderline: true }}
        />
        <br />
        <div style={{ display: 'flex' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "50%", margin: "5px", backgroundColor: '#f8fafc' }} variant="filled" label="Deadline" InputProps={{
                disableUnderline: true,
              }}
            />
          </LocalizationProvider>

          <TextField
            select
            style={{ width: "50%", margin: "5px" }}
            type="text"
            label="Assign person"
            variant="filled"
            InputProps={{ disableUnderline: true }}
          />
        </div>
        {/* should map the employee */}
        <br />
        <TextField
          style={{ margin: "5px" }}
          type="text"
          label="Description"
          variant="filled"
          InputProps={{
            disableUnderline: true,
            style: { height: 300 }
          }}
        />
        <div style={{paddingTop: '1rem', alignSelf: 'flex-end'
}}>


        <Button sx={{ maxWidth: '20%' }} variant="contained">
          Save
        </Button>
        </div>
      </FormControl>
    </Card>

  );
}