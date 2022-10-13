import React from "react";
const style = {
  backgroundColor: "rgb(0 0 0 / 60%)",
  color: "white",
  borderTop: "0px solid #E7E7E7",
  textAlign: "center",
  padding: "2% 0",
  top: "10px",
  left: "0",
  bottom: "0",
  width: "100%",
};

const footer = () => {
  return (
    <div>
      <div style={style}>© 2022 betaPortal. All rights reserved.</div>
    </div>
  );
};

export default footer;
