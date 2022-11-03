import React from "react";
import { Route, Routes } from "react-router-dom";
import "./assets/styles/App.css";
import LoginPage from "./pages/loginpage";
import HomePage from "./pages/homepage";
import Navbar from "./components/navbar";
import Create_Employee from "./components/create_employee";
import Delete_Employee from "./components/delete_employee";
import Edit_Employee from "./components/edit_employee";
import List_Employees from "./components/list_employees";
import View_Employee from "./components/view_employee";
import Create_Project from "./components/create_project";
import Delete_Project from "./components/delete_project";
import Edit_Project from "./components/edit_project";
import List_Projects from "./components/list_projects";
import Footer from "./components/footer";
import Request_Table from "./components/request_employees";
// import Chart from "./components/chart";
import "./assets/styles/footer.css"

// import BarChart from "./components/BarChart";
import DirectorDashboard from "./components/DirectorDashboard";
import { UserData } from "./Data";
import { useState } from "react";
// import { margin } from "@mui/system";

function App() {

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.ProjectName),
    datasets: [
      {
        label: "Growth in %",
        data: UserData.map((data) => data.ProjectGrowth),
        backgroundColor: [
          "#ffbb11",
          "#2d2d2d",
          "#50AF95",
          "#2a71d0"
        ],
        barPercentage: 80,
        barThickness: 50,
        maxBarThickness: 20,
        minBarLength: 20,
      },
    ],
  });

  return (
    <div>
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>
      <body>
        
       <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/createemployee' exact element={<Create_Employee />} />
            <Route path='/listemployee' element={<List_Employees />} />
            <Route path="/view/:_id" element={<View_Employee />} />
            <Route path="/edit/:_id" element={<Edit_Employee />} />
            <Route path='/requestemployees' element={<Request_Table />} />
            <Route path="/delete/:_id" element={<Delete_Employee />} />
            <Route path='/createproject' exact element={<Create_Project />} />
            <Route path='/listproject' element={<List_Projects />} />
            <Route path="/editproject/:_id" element={<Edit_Project />} />
            <Route path="/deleteproject/:_id" element={<Delete_Project />} />
            <Route
            path="/directordashboard"
            element={<DirectorDashboard chartData={userData} />}
          />
          </Routes>
      </body>

      <div>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default App;
