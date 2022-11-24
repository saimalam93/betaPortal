import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import viewSingleEmployee from "../graphql/viewSingleEmployee";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Divider from "@mui/material/Divider";
import MuiGrid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import "../assets/styles/viewEmp.css";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import { AuthContext } from "../context/authContext";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/IconButton";
import PhotoCamera from "@mui/material/IconButton";
import Password_Modal from "./Password_Modal";

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

const theme = createTheme({});

const NAME_OF_UPLOAD_PRESET = "aoayxrqj";
const YOUR_CLOUDINARY_ID = "dtoza9lm0";

// A helper function
async function uploadImage(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", NAME_OF_UPLOAD_PRESET);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${YOUR_CLOUDINARY_ID}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );
  const img = await res.json();
  console.log(img);
  return img.secure_url;
}

const Veiw_Profile = (props) => {
  const url = "http://localhost:4000/graphql";
  const [loggedEmp, setloggedEmp] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setloggedEmp(user);
  }, [loggedEmp]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let filters = {};

  const [formData, setFormData] = useState({
    // ...other fields
    img: "",
  });
  const [uploadingImg, setUploadingImg] = useState(false);

  const handleFileChange = async (event) => {
    const [file] = event.target.files;
    if (!file) return;

    setUploadingImg(true);
    const uploadedUrl = await uploadImage(file);
    setFormData({ ...formData, img: uploadedUrl });
    setUploadingImg(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // disable the form submit when uploading image
    if (uploadingImg) return;

    const content = (
      <div>
        {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
       Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
       Sed malesuada lobortis pretium.`}
      </div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1 align="center">{user.fname}'s PROFILE</h1>
        <Container fixed>
          <form onSubmit={handleSubmit}>
            <Grid container>
              {open ? (
                <Password_Modal open={open} handleClose={handleClose} />
              ) : null}
              <Grid item xs>
                {/* Image preview */}
                {formData.img && (
                  <figure>
                    <img
                      alt="preview"
                      src={formData.img}
                      style={{ width: 500, height: "500" }}
                    />
                    <figcaption>Preview</figcaption>
                  </figure>
                )}
                {/* Inputs */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploadingImg}
                />
                <button type="submit" disabled={uploadingImg}>
                  Submit
                </button>

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
                    {moment(loggedEmp.dateOfJoining)
                      .utc()
                      .format("Do MMMM YYYY")}
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
                      Phone : {user.mobile}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="empDetails"
                      component="div"
                      sx={{ paddingTop: "2rem" }}
                    >
                      Address : {user.address}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="empDetails"
                      component="div"
                      sx={{ paddingTop: "2rem" }}
                    >
                      E-Mail : {user.email}
                    </Typography>
                  </Box>

                  <Box sx={{ m: 2 }}>
                    <Button
                      variant="contained"
                      component="label"
                      color="warning"
                    >
                      Upload Profile Image
                      <input hidden accept="image/*" multiple type="file" />
                    </Button>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input hidden accept="image/*" type="file" />

                      <PhotoCamera />
                    </IconButton>

                    <Button
                      onClick={handleOpen}
                      variant="contained"
                      component="label"
                      color="success"
                    >
                      Change Password
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Veiw_Profile;
