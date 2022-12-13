import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { UserData } from "../SampleData";

function DirectorDashboard({ chartData }) {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.ProjectName),
    datasets: [
      {
        label: "Project Cost",
        data: UserData.map((data) => data.ProjectCost),
        backgroundColor: ["#ffbb11", "#2d2d2d", "#50AF95", "#2a71d0"],
        barPercentage: 80,
        barThickness: 50,
        maxBarThickness: 20,
        minBarLength: 20,
      },
    ],
  });

  const [userDataBar, setUserDataBar] = useState({
    labels: UserData.map((data) => data.ProjectName),
    datasets: [
      {
        label: "Project Growth",
        data: UserData.map((data) => data.ProjectGrowth),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1,
      },
    ],
  });
  return (
    <div align="center" color="blue">
      {" "}
      <h2>PROJECT STATISTICS</h2>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <Box
            display="flex"
            justifyContent="flex-start"
            paddingTop={20}
            paddingRight={10}
          >
            <Bar data={userDataBar}></Bar>
          </Box>
        </Grid>
        <Grid item sm={5}>
          <Box display="flex" justifyContent="flex-end">
            <Pie data={userData}></Pie>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default DirectorDashboard;
