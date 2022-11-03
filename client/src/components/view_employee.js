import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import Stack from "@mui/system/Stack";
import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';
// import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
// import Grid from "@mui/system/Unstable_Grid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import updateEmployee from "../graphql/editEmployee";
import viewSingleEmployee from "../graphql/viewSingleEmployee";
// import NotInterested from "@mui/icons-material/NotInterested";
// import Stack from "@mui/material/Stack";

import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import MuiGrid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import "../assets/styles/viewEmp.css"
import Rating from '@mui/material/Rating';
// import EmailIcon from '@mui/icons-material/Email';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { sizing } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material/styles";

// import img from '../assets/images/helly.jpg';
const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& [role="separator"]': {
        margin: theme.spacing(0, 2),
    },
}));

const theme = createTheme({
    // typography: {
    //     h4: {
    //         color: 'red'
    //     },
    //     empDetailsFade: {
    //         color: 'blue'
    //     },
    //     empDetails: {
    //         color: 'blue'
    //     }
    // }
});

const Edit_Employee = (props) => {
    const url = "http://localhost:4000/graphql";
    // const [employee, setEmployee] = useState({});
    const [oldEmp, setOldEmp] = useState({});
    // const navigate = useNavigate();
    const { _id } = useParams();
    let filters = {};

    const content = (
        <div>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
       Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
       Sed malesuada lobortis pretium.`}
        </div>
    );

    useEffect(() => {
        loadData(filters);
    }, []);

    const loadData = (filters) => {
        viewSingleEmployee(url, { _id }).then((result) => {
            setOldEmp(result.data.viewSingleEmployee);
            console.log(result.data.viewSingleEmployee);
        });
    }; // end of loadData


    return (
        <ThemeProvider theme={theme}>
            <div>
                <h1 align="center">EMPLOYEE PROFILE</h1>

                {/* <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: "#1D7874", color: "white" }}>
                                <TableCell style={{ color: "#ffffff" }}>Employee ID</TableCell>
                                <TableCell style={{ color: "#ffffff" }}>First Name</TableCell>
                                <TableCell style={{ color: "#ffffff" }}>Last Name</TableCell>
                                <TableCell style={{ color: "#ffffff" }}>Mobile</TableCell>
                                <TableCell style={{ color: "#ffffff" }} align="right">
                                    Date Of Joining
                                </TableCell>
                                <TableCell style={{ color: "#ffffff" }}>Role</TableCell>
                                <TableCell style={{ color: "#ffffff" }}>Current Status</TableCell>
                                <TableCell style={{ color: "#ffffff" }} align="right">
                                    Date Of Birth
                                </TableCell>
                                <TableCell style={{ color: "#ffffff" }} align="right">Emergency Contact</TableCell>
                                <TableCell style={{ color: "#ffffff" }} align="right">Address</TableCell>
                                <TableCell style={{ color: "#ffffff" }} align="right">SIN</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                key={oldEmp._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {oldEmp.loginID}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {oldEmp.fname}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {oldEmp.lname}
                                </TableCell>
                                <TableCell align="right">
                                    {oldEmp.mobile}
                                </TableCell>
                                <TableCell align="right">
                                    {moment(oldEmp.dateOfJoining).utc().format("Do MMMM YYYY")}
                                </TableCell>
                                <TableCell align="right">
                                    {oldEmp.role}
                                </TableCell>
                                <TableCell align="right">
                                    {oldEmp.currentStatus}
                                </TableCell>
                                <TableCell align="right">
                                    {moment(oldEmp.dateOfBirth).utc().format("Do MMMM YYYY")}
                                </TableCell>
                                <TableCell align="right">
                                    {oldEmp.emergencyContact}
                                </TableCell>
                                <TableCell align="right">
                                    {oldEmp.address}
                                </TableCell>
                                <TableCell align="right">
                                    {oldEmp.sin}
                                </TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Container>
                <div>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={3}>
                            <Grid item xs>
                                {oldEmp.sin}
                            </Grid>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: "#1D7874", color: "white" }}>
                                            <TableCell style={{ color: "#ffffff" }}>Employee ID</TableCell>
                                            <TableCell style={{ color: "#ffffff" }}>First Name</TableCell>
                                            <TableCell style={{ color: "#ffffff" }}>Last Name</TableCell>
                                            <TableCell style={{ color: "#ffffff" }}>Mobile</TableCell>
                                            <TableCell style={{ color: "#ffffff" }} align="right">
                                                Date Of Joining
                                            </TableCell>
                                            <TableCell style={{ color: "#ffffff" }}>Role</TableCell>
                                            <TableCell style={{ color: "#ffffff" }}>Current Status</TableCell>
                                            <TableCell style={{ color: "#ffffff" }} align="right">
                                                Date Of Birth
                                            </TableCell>
                                            <TableCell style={{ color: "#ffffff" }} align="right">Emergency Contact</TableCell>
                                            <TableCell style={{ color: "#ffffff" }} align="right">Address</TableCell>
                                            <TableCell style={{ color: "#ffffff" }} align="right">SIN</TableCell>
                                            <TableCell style={{ color: "#ffffff" }} align="right">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow
                                            key={oldEmp._id}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {oldEmp.loginID}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {oldEmp.fname}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {oldEmp.lname}
                                            </TableCell>
                                            <TableCell align="right">
                                                {oldEmp.mobile}
                                            </TableCell>
                                            <TableCell align="right">
                                                {moment(oldEmp.dateOfJoining).utc().format("Do MMMM YYYY")}
                                            </TableCell>
                                            <TableCell align="right">
                                                {oldEmp.role}
                                            </TableCell>
                                            <TableCell align="right">
                                                {oldEmp.currentStatus}
                                            </TableCell>
                                            <TableCell align="right">
                                                {moment(oldEmp.dateOfBirth).utc().format("Do MMMM YYYY")}
                                            </TableCell>
                                            <TableCell align="right">
                                                {oldEmp.emergencyContact}
                                            </TableCell>
                                            <TableCell align="right">
                                                {oldEmp.address}
                                            </TableCell>
                                            <TableCell align="right">
                                                {oldEmp.sin}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Fab color="secondary" aria-label="edit">
                                                    <EditIcon />
                                                </Fab>
                                            </TableCell>

                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Box>
                </div>
            </Container> */}
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
                                src={require('../assets/images/manIcon.png')}
                            />
                            <Box sx={{ m: 2 }}>
                                <Typography gutterBottom variant="h6" sx={{ paddingTop: '2rem' }}>
                                    BASIC INFORMATION
                                </Typography>
                                <Typography gutterBottom variant="empDetails" component="div" sx={{ paddingTop: '2rem' }}>
                                    Current Status : {oldEmp.currentStatus}
                                </Typography>
                                <Typography gutterBottom variant="empDetails" component="div" sx={{ paddingTop: '2rem' }}>
                                    Date of Birth : {moment(oldEmp.dateOfBirth).utc().format("Do MMMM YYYY")}
                                </Typography>
                                <Typography gutterBottom variant="empDetails" component="div" sx={{ paddingTop: '2rem' }}>
                                    Date of Joining : {moment(oldEmp.dateOfJoining).utc().format("Do MMMM YYYY")}
                                </Typography>

                            </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs>

                            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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

                                            <Typography gutterBottom variant="empDetailsFade" component="div" sx={{ paddingTop: '2rem' }}>
                                                RANKINGS<br /><Rating name="size-medium" defaultValue={0} size="large" />
                                            </Typography>

                                        </Grid>
                                        <Grid item>
                                            <Typography gutterBottom variant="empDetails" component="div" sx={{ paddingTop: '2rem' }}>
                                                <Grid container direction="row" alignItems="center">
                                                    <ChatBubbleIcon style={{ minWidth: '40px' }} />Send E-Mail
                                                </Grid>
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <TabContext>
                                        <Typography gutterBottom component="div">
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                                    <Typography gutterBottom variant="h6" >
                                        CONTACT INFORMATION
                                    </Typography>
                                    <Typography gutterBottom variant="empDetails" component="div" sx={{ paddingTop: '2rem' }}>
                                        Phone : {oldEmp.mobile}
                                    </Typography>
                                    <Typography gutterBottom variant="empDetails" component="div" sx={{ paddingTop: '2rem' }}>
                                        Address : {oldEmp.address}
                                    </Typography>
                                    <Typography gutterBottom variant="empDetails" component="div" sx={{ paddingTop: '2rem' }}>
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

export default Edit_Employee;
