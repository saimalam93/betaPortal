import { Box, Tab, Tabs } from "@material-ui/core";
import { TabContext, TabPanel } from "@mui/lab/";
import React, { useEffect, useState } from "react";
import getAllTasks from "../../graphql/getAllTasks";
import AddtaskForm from "./components/AddtaskForm";
import TaskForReviewList from "./components/TaskForReviewList";
import UndragableDashborad from "./components/UndragableDashborad";

function Overview({ tasks, setTasks }) {
  return (
    <div style={{ display: "flex", gap: "3rem" }}>
      <div style={{ width: "50%" }}>
        <TaskForReviewList tasks={tasks} />
      </div>
      <div style={{ width: "50%" }}>
        <AddtaskForm tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

const ManagerDashboard = () => {
  const [value, setValue] = useState("0");
  const url = "https://betaportal-saimalam.onrender.com/graphql";
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await getAllTasks(url).then((result) => {
      setTasks(result.data.getTasks);
    });
  }; // end of loadData

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <Box sx={{ width: "100%" }}>
    <TabContext value={value}>
      <Box>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Overview" value="0" />
          <Tab label="Dashboard" value="1" />
        </Tabs>
      </Box>
      <TabPanel value="0">
        <Overview tasks={tasks} setTasks={setTasks} />
      </TabPanel>
      <TabPanel value="1">
        <UndragableDashborad tasks={tasks} setTasks={setTasks} />
      </TabPanel>
    </TabContext>
    // </Box>
  );
};

export default ManagerDashboard;
