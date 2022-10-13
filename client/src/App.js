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
import Footer from "./components/footer";
import "./assets/styles/footer.css"



function App() {
  return (
    <div>
      <header>
        <nav>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/createemployee' exact element={<Create_Employee />} />
            <Route path='/listemployee' element={<List_Employees />} />
            <Route path="/edit/:_id" element={<Edit_Employee />} />
            <Route path="/delete/:_id" element={<Delete_Employee />} />
          </Routes>
        </nav>

      </header>
      <div>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
    // <div className="App">
    //   {/* <div>
    //     {employees.map((employee) => (
    //       <div key={employee._id}>
    //         {employee.fname} {employee.lname}
    //       </div>
    //     ))}
    //   </div> */}
    //   <header className="App-header">
    //     <Navbar />
    //     <Routes>
    //       <Route path="/" element={<HomePage />} />
    //       <Route path="/login" element={<LoginPage />} />
    //       <Route path='/createemployee' exact element={<Create_Employee />} />
    //       <Route path='/listemployee' element={<List_Employees />} />
    //       <Route path="/edit/:_id" element={<Edit_Employee />} />
    //       <Route path="/delete/:_id" element={<Delete_Employee />} />
    //     </Routes>
    //   </header>
    //   <Footer />
    // </div>
  );
}

export default App;
