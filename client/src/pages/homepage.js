import { color } from "@mui/system";
import React from "react";
import Image from "../assets/images/betaPortal_bg.jpg";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// const styles = {
//     paperContainer: {
//         height: 1356,
//         background: color('#163932')
//         // background: `url(${Image})`
//     }
// };
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "serif",
      textTransform: "none",
      fontSize: 16,
    },
  },
});

const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyles
          styles={{
            body: {
              background: `url(${Image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "100vw",
              height: "110vh",
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default HomePage;
