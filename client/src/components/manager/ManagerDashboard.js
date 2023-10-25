import React from "react";
import TaskForReviewList from './components/TaskForReviewList';
import AddtaskForm from './components/AddtaskForm';
import TaskDetailPop from './components/TaskDetailPop'
import { Grid, Tabs, Tab, Box } from '@material-ui/core';
import { TabPanel, TabContext } from '@mui/lab/';
import '../../assets/styles/manager.css';


function Overview() {

  return (
    <div className="manager-wrap">
      <Grid md={6} sm={12}>  <TaskForReviewList /> </Grid>
      <Grid md={6} sm={12}>  <AddtaskForm /> </Grid>
    </div>
  );
}

const ManagerDashboard = () => {

  const [value, setValue] = React.useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Overview" value="0" />
            <Tab label="Dashboard" value="1"/>
          </Tabs>
        </Box>
        <TabPanel value="0"><Overview /></TabPanel>
        <TabPanel value="1">Task Dashboard <TaskDetailPop /></TabPanel>
      </TabContext>
    </Box>
  )
};

export default ManagerDashboard;

