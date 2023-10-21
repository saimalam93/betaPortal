import React, { useContext } from "react";

import { Route, Routes } from "react-router-dom";
import "./assets/styles/App.css";
import "./assets/styles/footer.css";
import CreateEmployee from "./components/create_employee";
import CreateProject from "./components/create_project";
import CreateRequest from "./components/create_request";
import DeleteEmployee from "./components/delete_employee";
import DeleteProject from "./components/delete_project";
import DeleteRequest from "./components/delete_request";
import DirectorDashboard from "./components/DirectorDashboard";
import EditEmployee from "./components/edit_employee";
import EditProject from "./components/edit_project";
import UpdateRequest from "./components/edit_requests";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import EmployeeRequests from "./components/employee_requests";
import Footer from "./components/footer";
import ListEmployees from "./components/list_employees";
import ListProjects from "./components/list_projects";
import ListRequests from "./components/list_requests";
import Navbar from "./components/navbar";
import RequestTable from "./components/request_employees";
import ViewEmployee from "./components/view_employee";
import ViewProfile from "./components/view_profile";
import { AuthContext } from "./context/authContext";
import UnauthorizedAccess from "./pages/403";
import HomePage from "./pages/homepage";
import LoginPage from "./pages/loginpage";
import ManagerDashboard from "./components/manager/ManagerDashboard";

import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          subtitle1: 'span',
          subtitle2: 'span',
          body1: 'p',
          body2: 'p',
        },
      },
    },
  },
});

function App() {
  const { user } = useContext(AuthContext);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="content-container">
          <nav>
            <Navbar />
          </nav>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {user ? (
                <Route path="/login" element={<UnauthorizedAccess />} />
              ) : (
                <Route path="/login" element={<LoginPage />} />
              )}
              {user && user.role === "Admin" ? (
                <>
                  <Route
                    path="/createemployee"
                    exact
                    element={<CreateEmployee />}
                  />
                  <Route path="/listemployee" element={<ListEmployees />} />
                  <Route path="/view/:_id" element={<ViewEmployee />} />
                  <Route path="/edit/:_id" element={<EditEmployee />} />
                  <Route path="/requestemployees" element={<RequestTable />} />
                  <Route path="/delete/:_id" element={<DeleteEmployee />} />
                </>
              ) : user && user.role === "Director" ? (
                <>
                  <Route
                    path="/createproject"
                    exact
                    element={<CreateProject />}
                  />
                  <Route path="/listproject" element={<ListProjects />} />
                  <Route path="/editproject/:_id" element={<EditProject />} />
                  <Route path="/deleteproject/:_id" element={<DeleteProject />} />
                  <Route path="/listrequest" element={<ListRequests />} />
                  <Route
                    path="/director-dashboard"
                    element={<DirectorDashboard />}
                  />
                </>
              ) : user && user.role === "Employee" ? (
                <>
                  <Route
                    path="/employee-dashboard"
                    element={<EmployeeDashboard />}
                  />
                  <Route
                    path="/createrequest"
                    exact
                    element={<CreateRequest />}
                  />
                  <Route path="/deleterequest/:_id" element={<DeleteRequest />} />
                  <Route path="/editrequest/:_id" element={<UpdateRequest />} />
                  <Route
                    path="/employeerequests/:_id"
                    element={<EmployeeRequests />}
                  />
                  <Route path="/viewprofile" element={<ViewProfile />} />
                </>
              ) : user && user.role === "Manager" ? (
                <>
                  <Route
                    path="/manager-dashboard"
                    element={<ManagerDashboard />}
                  />
                  <Route path="/viewprofile" element={<ViewProfile />} />

                  {/* Add Manager routes if any here */}
                </>
              ) : (
                <Route path="*" element={<UnauthorizedAccess />} />
              )}

              <Route path="*" element={<UnauthorizedAccess />} />
            </Routes>
          </main>
        </div>
        <footer className="footer--pin">
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
