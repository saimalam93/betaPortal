import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  let menu;
  if (user) {
    if (user.role === "Director") {
      menu = (
        <>
          <Button style={{ textDecoration: "none", color: "white" }}>
            Director
          </Button>
          <Button style={{ textDecoration: "none", color: "white" }}>
            Some Other Director Menu Item
          </Button>
        </>
      );
    } else {
      menu = (
        <Button style={{ textDecoration: "none", color: "white" }}>
          Someone Else
        </Button>
      );
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </Typography>
          <Box alignItems="right" style={{ flexGrow: 1, textAlign: "right" }}>
            {menu}
            {user ? (
              <Button
                onClick={logout}
                style={{ textDecoration: "none", color: "white" }}
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
