import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiGrid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import "../assets/styles/viewEmp.css";
import { AuthContext } from "../context/authContext";
import viewSingleEmployee from "../graphql/viewSingleEmployee";

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

const theme = createTheme({});

const View_Profile = (props) => {
  const url = "http://localhost:4000/graphql";
  const [loggedEmp, setloggedEmp] = useState({});
  const { user } = useContext(AuthContext);
  const _id = user._id;
  let filters = {};

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadData(filters);
  }, []);

  const loadData = (filters) => {
    viewSingleEmployee(url, { _id }).then((result) => {
      setloggedEmp(result.data.viewSingleEmployee);
    });
  }; // end of loadData

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1 align="center">{loggedEmp.fname}'s PROFILE</h1>
        <Container fixed>
          <Grid container>
            <Grid item xs>
              <Box
                component="img"
                sx={{
                  height: 500,
                  width: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                src={require("../assets/images/manIcon.png")}
              />
              {isOpen ? <div className="chat"></div> : null}
              <Box sx={{ m: 2 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  sx={{ paddingTop: "2rem" }}
                >
                  BASIC INFORMATION
                </Typography>
                <Typography
                  gutterBottom
                  variant="empDetails"
                  component="div"
                  sx={{ paddingTop: "2rem" }}
                >
                  Current Status : {loggedEmp.currentStatus}
                </Typography>
                <Typography
                  gutterBottom
                  variant="empDetails"
                  component="div"
                  sx={{ paddingTop: "2rem" }}
                >
                  Date of Birth :{" "}
                  {moment(loggedEmp.dateOfBirth).utc().format("Do MMMM YYYY")}
                </Typography>
                <Typography
                  gutterBottom
                  variant="empDetails"
                  component="div"
                  sx={{ paddingTop: "2rem" }}
                >
                  Date of Joining :{" "}
                  {moment(loggedEmp.dateOfJoining).utc().format("Do MMMM YYYY")}
                </Typography>
              </Box>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <Box sx={{ my: 3, mx: 2 }}>
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <Typography variant="h4" component="div">
                        {loggedEmp.fname} {loggedEmp.lname}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant="h6" component="div">
                        {loggedEmp.role}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        gutterBottom
                        variant="empDetailsFade"
                        component="div"
                        sx={{ paddingTop: "2rem" }}
                      >
                        RANKINGS
                        <br />
                        <Rating
                          name="size-medium"
                          defaultValue={0}
                          size="large"
                        />
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        gutterBottom
                        variant="empDetails"
                        component="div"
                        sx={{ paddingTop: "2rem" }}
                      >
                        <Grid container direction="row" alignItems="center">
                          <ChatBubbleIcon style={{ minWidth: "40px" }} />
                          Send E-Mail
                        </Grid>
                      </Typography>
                    </Grid>
                  </Grid>

                  <TabContext>
                    <Typography gutterBottom component="div">
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList>
                          <Tab label="About" value="1" />
                        </TabList>
                      </Box>
                      <TabPanel value="1">About</TabPanel>
                    </Typography>
                  </TabContext>
                </Box>
                {/* <Divider variant="middle" /> */}
                <Box sx={{ m: 2 }}>
                  <Typography gutterBottom variant="h6">
                    CONTACT INFORMATION
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="empDetails"
                    component="div"
                    sx={{ paddingTop: "2rem" }}
                  >
                    Phone : {loggedEmp.mobile}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="empDetails"
                    component="div"
                    sx={{ paddingTop: "2rem" }}
                  >
                    Address : {loggedEmp.address}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="empDetails"
                    component="div"
                    sx={{ paddingTop: "2rem" }}
                  >
                    E-Mail : {loggedEmp.email}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default View_Profile;
