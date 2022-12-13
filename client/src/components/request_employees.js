import CancelIcon from "@mui/icons-material/Cancel";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";

function Request_Table() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const data = [
    {
      id: 1,
      e_id: 12,
      fname: "Denna",
      lname: "Rose",
      description: "abcd",
    },
    {
      id: 2,
      e_id: 17,
      fname: "Helly",
      lname: "Patel",
      description: "abcd",
    },
    {
      id: 3,
      e_id: 18,
      fname: "Akshaye",
      lname: "Koothupalakkal Sasidharan",
      description: "abcd",
    },
  ];

  return (
    <Container maxWidth={false}>
      <h1 align="center">REQUEST FOR APPROVAL</h1>
      <br></br>
      <div>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {data.map((emp) => {
              return (
                <Grid item xs={6}>
                  <Item>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14, fontSize: 20 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Request No:{emp.id}
                        </Typography>

                        <Typography
                          color="text.secondary"
                          sx={{
                            mb: 1.8,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            sx={{
                              mb: 3,
                              justifyContent: "flex-start",
                              p: 1,
                              m: 1,
                              bgcolor: "background.paper",
                              fontWeight: "bold",
                              fontSize: 25,
                              borderRadius: 1,
                            }}
                            color="text.secondary"
                          >
                            {emp.fname + "  " + emp.lname}
                          </Typography>

                          <Typography
                            sx={{
                              mb: 1.8,
                              justifyContent: "flex-end",
                              p: 1,
                              m: 1,
                              bgcolor: "background.paper",
                              fontSize: 25,
                              fontWeight: "bold",
                              borderRadius: 1,
                            }}
                            color="text.secondary"
                          >
                            ID: {emp.e_id}
                          </Typography>
                        </Typography>

                        <br></br>
                        <Typography sx={{ mb: 1.8 }} color="text.secondary">
                          {emp.description}
                        </Typography>
                      </CardContent>

                      <CardActions
                        sx={{
                          mb: 1.8,
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <IconButton
                          aria-label="Approve"
                          size="large"
                          sx={{
                            mb: 1.8,
                            justifyContent: "flex-start",
                            p: 1,
                            m: 1,
                            bgcolor: "background.paper",
                            borderRadius: 1,
                          }}
                        >
                          <ThumbUpIcon
                            style={{ fill: "#49be25" }}
                            fontSize="large"
                          />
                        </IconButton>
                        <IconButton
                          aria-label="Approve"
                          size="large"
                          sx={{
                            mb: 1.8,
                            justifyContent: "flex-end",
                            p: 1,
                            m: 1,
                            bgcolor: "background.paper",
                            borderRadius: 1,
                          }}
                        >
                          <CancelIcon
                            style={{ fill: "#be4d25" }}
                            fontSize="large"
                          />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Item>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </div>
    </Container>
  );
}

export default Request_Table;
