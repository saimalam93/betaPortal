import React from "react";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import BasicList from "./requestList";

const RequestsBell = ({ iconColor, badgeContent }) => {
  const newRequest = `You have ${badgeContent} new Requests`;
  const noRequest = `No new Request`;

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Tooltip title={badgeContent ? newRequest : noRequest}>
        <IconButton onClick={handleOpen} anchorEl={anchorEl}>
          <Badge badgeContent={badgeContent} color="error">
            <NotificationsIcon color={iconColor} />
          </Badge>
        </IconButton>
      </Tooltip>
      <BasicList open={open} anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
};

export default RequestsBell;
