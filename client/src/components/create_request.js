import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Grid from "@mui/system/Unstable_Grid";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import createRequest from "../graphql/createRequest";
import viewAllEmployees from "../graphql/viewAllEmployees";
import { AuthContext, AuthProvider } from "../context/authContext";


// create a new request

const Create_Request = () => {
    const url = "http://localhost:4000/graphql";
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    console.log(user);

    const [request, setRequest] = useState({
        request_subject: "",
        reason: "",
        startDate: "",
        endDate: "",
    });

    // handle change function
    const handleChange = (event) => {
        setRequest({ ...request, [event.target.name]: event.target.value });

    };

    // handle submit function
    const submit = (e) => {
        e.preventDefault();
        setRequest({
            request_subject: "",
            reason: "",
            startDate: "",
            endDate: "",
        });
        request.employee = user._id;
        createRequest(url, { request }).then((result) => {
            setRequest(result.data.createRequest);
            console.log(result);
            navigate("/listrequest");
        });
    };
    return (
        <Container component="main" maxWidth="xs">
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
                                <h1>Create A New Request</h1>
                            </Grid>
                            <Grid xs>
                                <TextField
                                    label="Request Subject"
                                    type="text"
                                    name="request_subject"
                                    value={request.request_subject}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid xs>
                                <TextField
                                    label="Reason"
                                    type="text"
                                    name="reason"
                                    value={request.reason}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid xs>
                                <TextField
                                    label="Start Date"
                                    type="date"
                                    name="startDate"
                                    value={request.startDate}
                                    onChange={handleChange}
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid xs>
                                <TextField
                                    label="End Date"
                                    type="date"
                                    name="endDate"
                                    value={request.endDate}
                                    onChange={handleChange}
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    style={{ width: 200, height: 50, background: "#1D7874" }}
                                >
                                    ADD
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </div>
        </Container>
    );
};
export default Create_Request;
