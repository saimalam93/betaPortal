import { Typography } from "@mui/material";
import React, { useContext } from "react";
import bg from "../assets/images/bg.png";
import bots from "../assets/images/bots.png";
import { AuthContext } from "../context/authContext";

const UnauthorizedAccess = () => {
  const { user } = useContext(AuthContext);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "99vw",
        height: "90vh",
        margin: "0",
      }}
    >
      <Typography
        variant="h1"
        style={{
          color: "white",
          textShadow: "15px 15px 4px #000000",
          fontSize: "10rem",
          fontWeight: "bold",
          fontFamily: "sans-serif",
          textAlign: "center",
          margin: "50px 0",
          letterSpacing: "50px",
        }}
      >
        403
      </Typography>
      <img
        src={bots}
        alt="403"
        style={{
          width: "70%",
          border: "none",
        }}
      />
      <Typography
        variant="h3"
        style={{
          color: "white",
          textShadow: "2px 2px 4px #000000",
          fontWeight: "bold",
          fontFamily: "sans-serif",
          textAlign: "center",
          letterSpacing: "4px",
          margin: "50px 0 0 0",
        }}
      >
        Unauthorized Access
      </Typography>
      <Typography
        variant="h5"
        style={{
          color: "white",
          textShadow: "2px 2px 4px #000000",
          fontFamily: "sans-serif",
          textAlign: "left",
          margin: "10px 0",
        }}
      >
        You are not authorized to access this page.
      </Typography>
      {user ? (
        <Typography
          variant="h6"
          style={{
            color: "white",
            fontSize: "14px",
          }}
        >
          You are currently logged in as {user.role}.
        </Typography>
      ) : (
        <Typography
          variant="h6"
          style={{
            color: "white",
            fontSize: "14px",
          }}
        >
          You are currently not logged in.{" "}
          <a
            href="/login"
            style={{
              color: "white",
              textDecoration: "underline",
            }}
          >
            You can log in here
          </a>
        </Typography>
      )}
    </div>
  );
};

export default UnauthorizedAccess;

// test Code

// <Container
//   maxWidth={false}
//   sx={{
//     display: "flex",
//     backgroundImage: `url(${bg})`,
//     backgroundPosition: "center",
//     backgroundSize: "cover",
//     backgroundRepeat: "no-repeat",
//     width: "100vw",
//     height: "100vh",
//   }}
// >
//   <Box
//     sx={{
//       backgroundImage: `url(${bots})`,
//       backgroundSize: "cover",
//       backgroundRepeat: "no-repeat",
//       width: "100%",
//     }}
//   ></Box>
//   <h1>403</h1>
//   <h1>Unauthorized Access</h1>
// </Container>
