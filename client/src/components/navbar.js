import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import RequestsBell from "./requestsBell";
import viewAllRequests from "../graphql/viewAllRequests";

const Navbar = () => {
  let navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const url = "http://localhost:4000/graphql";
  const [requests, setRequests] = useState([]);

  let filters = {};

  useEffect(() => {
    loadData(filters);
  }, []);

  const loadData = (filters) => {
    viewAllRequests(url, filters).then((result) => {
      setRequests(result.data.viewAllRequests);
    });
  }; // end of loadData

  let menu;
  if (user) {
    if (user.role === "Admin") {
      menu = (
        <>
          {/* <RequestsBell iconColor="action" badgeContent={3} /> */}
          <Button
            component={Link}
            to="/listemployee"
            style={{ textDecoration: "none", color: "white" }}
          >
            List
          </Button>

          <Button
            component={Link}
            to="/createemployee"
            style={{ textDecoration: "none", color: "white" }}
          >
            Create
          </Button>
        </>
      );
    } else if (user.role === "Director") {
      menu = (
        <>
          <RequestsBell iconColor="action" badgeContent={requests.length} />
          <Button
            component={Link}
            to="/listproject"
            style={{ textDecoration: "none", color: "white" }}
          >
            List
          </Button>

          <Button
            component={Link}
            to="/createproject"
            style={{ textDecoration: "none", color: "white" }}
          >
            Create
          </Button>
        </>
      );
    } else if (user.role === "Employee") {
      menu = (
        <>
          {/* <RequestsBell iconColor="action" badgeContent={3} /> */}
          <Button
            component={Link}
            to="/viewprofile"
            style={{ textDecoration: "none", color: "white" }}
          >
            Profile
          </Button>

          <Button
            component={Link}
            to="/employeerequests"
            style={{ textDecoration: "none", color: "white" }}
          >
            List
          </Button>

          <Button
            component={Link}
            to="/createrequest"
            style={{ textDecoration: "none", color: "white" }}
          >
            Create
          </Button>
        </>
      );
    } else {
      menu = (
        <Button
          style={{ textDecoration: "none", color: "white" }}
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Someone {user.role} Button
        </Button>
      );
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div">
            <Link
              to={
                user
                  ? user.role === "Admin"
                    ? `/listemployee`
                    : user.role === "Director"
                    ? `/director-dashboard`
                    : user.role === "Employee"
                    ? `/employee-dashboard`
                    : `/`
                  : "/"
              }
              style={{ textDecoration: "none", color: "white" }}
            >
              {user ? `${user.role} Portal` : "betaPortal 1.0"}
            </Link>
          </Typography>
          <Box alignItems="right" style={{ flexGrow: 1, textAlign: "right" }}>
            {menu}
            {user ? (
              <Button
                onClick={logout}
                style={{ textDecoration: "none", color: "white" }}
                component={Link}
                to="/login"
              >
                Logout
              </Button>
            ) : (
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginRight: "20px",
                }}
              >
                Login
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
