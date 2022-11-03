import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import RequestsBell from "./requestsBell";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  let menu;
  if (user) {
    if (user.role === "Admin") {
      menu = (
        <>
          <RequestsBell iconColor="action" badgeContent={2} />
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
          <RequestsBell iconColor="action" badgeContent={2} />
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
                    : "/"
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
