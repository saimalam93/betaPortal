import React from "react";
import TaskForReviewList from './components/TaskForReviewList';
import AddtaskForm from './components/AddtaskForm';
import { Tabs, Tab, Box } from '@material-ui/core';
import { TabPanel, TabContext } from '@mui/lab/';

function Overview() {

  return (
    <div style={{ display: 'flex', gap: '3rem' }}>
      <div style={{ width: '50%' }}>  <TaskForReviewList /> </div>
      <div style={{ width: '50%' }}>  <AddtaskForm /> </div>
    </div>
  );
}

const ManagerDashboard = () => {

  const [value, setValue] = React.useState('1');

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
        <TabPanel value="1">Task Dashboard</TabPanel>
      </TabContext>
    </Box>
  )
};

export default ManagerDashboard;

