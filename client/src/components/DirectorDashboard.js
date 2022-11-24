import React from "react";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Container, margin } from "@mui/system";
import { UserData } from "../SampleData";
import { useState } from "react";

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
  return (
    <div align="center" color="blue">
      {" "}
      <h2>PROJECT STATISTICS</h2>
      <Container fixed sx={{ paddingTop:"45px", height:"600px",
  width:"600px"}}>
        <Pie data={userData}></Pie>
      </Container>
    </div>
  );
}

export default DirectorDashboard;
