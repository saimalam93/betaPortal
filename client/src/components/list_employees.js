import moment from "moment";
import React, { useEffect, useState } from "react";
import viewAllEmployees from "../graphql/viewAllEmployees";
import { Link } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from "@mui/system";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

const List_Employees = (props) => {
    const url = "http://localhost:4000/graphql";
    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();

    let filters = {};

    useEffect(() => {
        loadData(filters);
    }, []);

    const loadData = (filters) => {
        console.log("AAA", employees);
        viewAllEmployees(url, filters).then((result) => {
            // console.log(result.data.viewAllEmployees);
            setEmployees(result.data.viewAllEmployees);
        });

    }; // end of loadData




    return (

        <Container maxWidth={false}>
            <h1 align="center">LIST OF ALL EMPLOYEES</h1>

            <TableContainer component={Paper}>

                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#1D7874', color: 'white', }}>
                            <TableCell style={{ color: '#ffffff' }}>First Name</TableCell>
                            <TableCell style={{ color: '#ffffff' }} >Last Name</TableCell>
                            <TableCell style={{ color: '#ffffff' }} align="right">Mobile</TableCell>
                            <TableCell style={{ color: '#ffffff' }} align="right">Date Of Joining</TableCell>
                            <TableCell style={{ color: '#ffffff' }} align="right">Role</TableCell>
                            <TableCell style={{ color: '#ffffff' }} align="right">Current Status</TableCell>
                            <TableCell style={{ color: '#ffffff' }} align="right">Date Of Birth</TableCell>
                            <TableCell style={{ color: '#ffffff' }} align="right">Emergency Contact</TableCell>
                            {/* <TableCell style={{ color: '#ffffff' }} align="right">Department</TableCell> */}
                            <TableCell style={{ color: '#ffffff' }} align="right">Address</TableCell>
                            <TableCell style={{ color: '#ffffff' }} align="right">SIN</TableCell>
                            <TableCell style={{ color: '#ffffff' }} align="right">Actions</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((emp) => (
                            <TableRow
                                key={emp._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {emp.fname}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {emp.lname}
                                </TableCell>
                                <TableCell align="right">{emp.mobile}</TableCell>
                                <TableCell align="right">{moment(emp.dateOfJoining).utc().format("Do MMMM YYYY")}</TableCell>
                                <TableCell align="right">{emp.role}</TableCell>
                                <TableCell align="right">{emp.currentStatus}</TableCell>
                                <TableCell align="right">{emp.dateOfBirth}</TableCell>
                                <TableCell align="right">{emp.emergencyContact}</TableCell>
                                {/* <TableCell align="right">{emp.department}</TableCell> */}
                                <TableCell align="right">{emp.address}</TableCell>
                                <TableCell align="right">{emp.sin}</TableCell>
                                <TableCell align="right">
                                    <Link to={`/edit/${emp._id}`} className="btn btn-primary"><IconButton aria-label="edit" size="large">
                                            <EditIcon style={{ fill: "#00A86B" }} fontSize="inherit" />
                                        </IconButton></Link>
                                    <Link to={`/delete/${emp._id}`} className="btn btn-primary"><IconButton aria-label="delete" size="large">
                                        <DeleteIcon style={{ fill: "#8D021F" }} fontSize="inherit" />
                                    </IconButton></Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Container >

    );
};

export default List_Employees;
