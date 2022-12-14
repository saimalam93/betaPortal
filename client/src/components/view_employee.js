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
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/styles/viewEmp.css";
import viewSingleEmployee from "../graphql/viewSingleEmployee";

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

const theme = createTheme({});

const View_Employee = (props) => {
  const url = "https://betaportal-saimalam.onrender.com/graphql";
  const [oldEmp, setOldEmp] = useState({});
  const { _id } = useParams();
  let filters = {};

  useEffect(() => {
    loadData(filters);
  }, []);

  const loadData = (filters) => {
    viewSingleEmployee(url, { _id }).then((result) => {
      setOldEmp(result.data.viewSingleEmployee);
    });
  }; // end of loadData

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1 align="center">EMPLOYEE PROFILE</h1>
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
                  Current Status : {oldEmp.currentStatus}
                </Typography>
                <Typography
                  gutterBottom
                  variant="empDetails"
                  component="div"
                  sx={{ paddingTop: "2rem" }}
                >
                  Date of Birth :{" "}
                  {moment(oldEmp.dateOfBirth).utc().format("Do MMMM YYYY")}
                </Typography>
                <Typography
                  gutterBottom
                  variant="empDetails"
                  component="div"
                  sx={{ paddingTop: "2rem" }}
                >
                  Date of Joining :{" "}
                  {moment(oldEmp.dateOfJoining).utc().format("Do MMMM YYYY")}
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
                        {oldEmp.fname} {oldEmp.lname}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant="h6" component="div">
                        {oldEmp.role}
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
                    Phone : {oldEmp.mobile}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="empDetails"
                    component="div"
                    sx={{ paddingTop: "2rem" }}
                  >
                    Address : {oldEmp.address}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="empDetails"
                    component="div"
                    sx={{ paddingTop: "2rem" }}
                  >
                    E-Mail : {oldEmp.email}
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

export default View_Employee;
