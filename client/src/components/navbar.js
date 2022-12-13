import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/betaPortalLogo.png";
import { AuthContext } from "../context/authContext";
import viewAllRequests from "../graphql/viewAllRequests";
import RequestsBell from "./requestsBell";

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

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

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
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static">
          <Toolbar>
            <Box
              component="img"
              sx={{
                height: 64,
                width: 64,
                border: 0,
              }}
              alt="Your logo."
              src={Logo}
            />
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
      </ThemeProvider>
    </Box>
  );
};

export default Navbar;
