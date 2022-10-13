import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import viewSingleEmployee from "../graphql/viewSingleEmployee";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from "@mui/system";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/system/Unstable_Grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import updateEmployee from "../graphql/editEmployee";


const Edit_Employee = (props) => {
    const url = "http://localhost:4000/graphql";
    const [employee, setEmployee] = useState({});
    const [changeEmp, setChangedEmp] = useState({});
    const navigate = useNavigate();
    const { _id } = useParams();
    let filters = {};

    useEffect(() => {
        loadData(filters);
    }, []);

    const loadData = (filters) => {
        viewSingleEmployee(url, { _id }).then((result) => {
            setChangedEmp(result.data.viewSingleEmployee);
        });
    }; // end of loadData

    const handleChange = (event) => {
        setChangedEmp({ ...employee, [event.target.name]: event.target.value });
        setEmployee({ ...employee, [event.target.name]: event.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        // setEmployee({
        //     _id,
        //     email,
        //     gender,
        //     address,
        //     emergencyContact,
        //     employee,
        //     department,
        //     sin,
        //     currentStatus,
        // });
        employee._id = _id;
        console.log(employee);
        updateEmployee(url, { employee }).then((result) => {
            console.log('result:', result);
            setEmployee(result.data.updateEmployee);
            console.log("AAA", employee);
            navigate("/listemployee");
        });
    };

    return (
        <div>
            <h1 align="center">Employee Update</h1>

            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#1D7874', color: 'white', }}>
                                <TableCell style={{ color: '#ffffff' }}>First Name</TableCell>
                                <TableCell style={{ color: '#ffffff' }}>Last Name</TableCell>
                                <TableCell style={{ color: '#ffffff' }} align="right">Date Of Joining</TableCell>
                                <TableCell style={{ color: '#ffffff' }} align="right">Date Of Birth</TableCell>
                                <TableCell style={{ color: '#ffffff' }} align="right">Sin</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                key={changeEmp._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {changeEmp.fname}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {changeEmp.lname}
                                </TableCell>
                                <TableCell align="right">{moment(changeEmp.dateOfJoining).utc().format("Do MMMM YYYY")}</TableCell>
                                <TableCell align="right">{moment(changeEmp.dateOfBirth).utc().format("Do MMMM YYYY")}</TableCell>
                                <TableCell align="right">{changeEmp.sin}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <div>
                <form onSubmit={submit}>
                    <Box sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, flexGrow: 1 }}>
                        <Grid container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={3}>
                            <Grid>
                                <h1>EDIT EMPLOYEE DEATILS</h1>
                            </Grid>
                            <Grid xs>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    label="Address"
                                    type="text"
                                    name="address"
                                    value={changeEmp.address}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid xs>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    label="Mobile Number"
                                    type="text"
                                    name="sin"
                                    value={changeEmp.sin}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid xs>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    label="Emergency Contact"
                                    type="text"
                                    name="emergencyContact"
                                    value={changeEmp.emergencyContact}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid xs>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    label="Email"
                                    type="text"
                                    name="email"
                                    value={changeEmp.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid xs>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    label="Current Status"
                                    type="text"
                                    name="currentStatus"
                                    value={changeEmp.currentStatus}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid>
                                <Button type="submit" variant="contained" style={{ width: 200, height: 50, background: "#1D7874" }}>
                                    UPDATE
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </div>
        </div>
    );
};

export default Edit_Employee;
