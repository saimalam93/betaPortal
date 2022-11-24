import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import updateRequest from "../graphql/updateRequest";
import viewAllEmployees from "../graphql/viewAllEmployees";
import viewSingleRequest from "../graphql/viewSingleRequest";
import NotInterested from "@mui/icons-material/NotInterested";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Edit_Request = (props) => {
    const url = "http://localhost:4000/graphql";
    const [request, setRequest] = useState([]);
    const [oldRequest, setOldRequest] = useState({});
    const [projectemployee, setProjectEmployee] = useState({});
    const navigate = useNavigate();
    const { _id } = useParams();
    const [employees, setEmployees] = useState([]);
    let filters = { role: "Employee" };

    useEffect(() => {
        loadData(filters);
    }, []);

    const loadData = (filters) => {
        viewSingleRequest(url, { _id }).then((result) => {
            const { projectemployee, ...request } = {
                ...result.data.viewSingleRequest,
            };
            setOldRequest(request);
            setProjectEmployee(projectemployee);
        });
        viewAllEmployees(url, { filters }).then((result) => {
            setEmployees(result.data.viewAllEmployees);
        });
        console.log(projectemployee.fname);
    };
    const handleChange = (event) => {
        setRequest({ ...request, [event.target.name]: event.target.value });
        setOldRequest({ ...oldRequest, [event.target.name]: event.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        request._id = _id;
        updateRequest(url, { request }).then((result) => {
            setRequest(result.data.updateRequest);
            navigate("/listrequest");
        });
    };

    return (
        <div>
            <h1 align="center">Employee Update</h1>

            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: "#1D7874", color: "white" }}>
                                <TableCell style={{ color: "#ffffff" }}>Request Subject</TableCell>
                                <TableCell style={{ color: "#ffffff" }}>Reason</TableCell>
                                <TableCell style={{ color: "#ffffff" }}>Request Status</TableCell>
                                <TableCell style={{ color: "#ffffff" }} align="right">
                                    Employee Name
                                </TableCell>
                                <TableCell style={{ color: "#ffffff" }} align="right">
                                    Start Date
                                </TableCell>
                                <TableCell style={{ color: "#ffffff" }} align="right">
                                    End Date
                                </TableCell>
                                <TableCell style={{ color: "#ffffff" }} align="right">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                key={oldRequest._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {oldRequest.request_subject}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {oldRequest.reason}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {oldRequest.request_status}
                                </TableCell>
                                <TableCell align="right">
                                    {projectemployee.fname} {projectemployee.lname}
                                </TableCell>
                                <TableCell align="right">
                                    {moment(oldRequest.startDate).utc().format("DD/MM/YYYY")}
                                </TableCell>
                                <TableCell align="right">
                                    {moment(oldRequest.endDate).utc().format("DD/MM/YYYY")}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <div>
                <form onSubmit={submit}>
                    <Box
                        sx={{
                            "& .MuiTextField-root": { m: 1, width: "50ch" },
                            flexGrow: 1,
                        }}
                    >
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={3}
                        >
                            <Grid>
                                <h1>Update Request</h1>
                            </Grid>
                            <Grid xs>
                                <TextField
                                    label="Request Subject"
                                    type="text"
                                    name="request_subject"
                                    value={oldRequest.request_subject}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid xs>
                                <TextField
                                    label="Reason"
                                    type="text"
                                    name="reason"
                                    value={oldRequest.reason}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Box sx={{ minWidth: 430, margin: "0" }}>
                                <InputLabel id="Employee" sx={{ margin: "0 25px" }}>
                                    Employee
                                </InputLabel>
                                <Select
                                    labelId="Employee"
                                    name="projectemployee"
                                    value={oldRequest.projectemployee}
                                    label="Project Employee"
                                    onChange={handleChange}
                                    fullWidth
                                    sx={{ margin: "0 25px" }}
                                >
                                    {employees.map((employee) => (
                                        <MenuItem key={employee._id} value={employee._id}>
                                            {employee.fname} {employee.lname}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                            <Grid>
                                <Stack
                                    m={2}
                                    justifyContent="center"
                                    direction="row"
                                    spacing={2}
                                >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        style={{ width: 200, height: 50, background: "#1D7874" }}
                                    >
                                        UPDATE
                                    </Button>
                                    <Button
                                        style={{ width: 200, height: 50, background: "#8D021F" }}
                                        variant="contained"
                                        startIcon={<NotInterested />}
                                        onClick={() => {
                                            navigate("/listrequest");
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </div>
        </div>
    );
};

export default Edit_Request;
