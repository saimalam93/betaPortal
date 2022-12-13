import Textarea from "@mui/joy/Textarea";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/system/Unstable_Grid";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import createRequest from "../graphql/createRequest";

const Create_Request = () => {
  const url = "https://betaportal-saimalam.onrender.com/graphql";
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [request, setRequest] = useState({
    request_subject: "",
    reason: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (event) => {
    setRequest({ ...request, [event.target.name]: event.target.value });
  };

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
      navigate("/listrequest");
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <div>
        <form onSubmit={submit}>
          <Box>
            <Grid
              container
              direction="column"
              justifyContent="center"
              spacing={3}
            >
              <Grid>
                <center>
                  <h1>Create A New Request</h1>
                </center>
              </Grid>
              <Grid xs>
                <TextField
                  label="Request Subject"
                  type="text"
                  name="request_subject"
                  value={request.request_subject}
                  onChange={handleChange}
                  sx={{
                    width: "100%",
                  }}
                  required
                />
              </Grid>
              <Grid xs>
                <Textarea
                  sx={{
                    width: { md: 400 },
                    "& .MuiInputBase-root": {
                      height: 80,
                    },
                  }}
                  minRows={2}
                  placeholder="Reason"
                  size="lg"
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
                  sx={{
                    width: "100%",
                    "@media (min-width: 780px)": {
                      width: "100%",
                    },
                  }}
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
                  sx={{
                    width: "100%",
                    "@media (min-width: 780px)": {
                      width: "100%",
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid>
                <center>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ width: 200, height: 50, background: "#1D7874" }}
                  >
                    ADD
                  </Button>
                </center>
              </Grid>
            </Grid>
          </Box>
        </form>
      </div>
    </Container>
  );
};
export default Create_Request;
