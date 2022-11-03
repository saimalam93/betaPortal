import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BasicList = ({ anchorEl, handleClose, open }) => {
  const navigate = useNavigate();
  const sampleRequests = [
    {
      id: 1,
      title: "Some Request One",
      description: "Description of Request One",
    },
    {
      id: 2,
      title: "Some Request Two",
      description: "Description of Request Two",
    },
  ];
  return (
    <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
      <List sx={{ width: "450px", maxWidth: 500 }}>
        {sampleRequests.map((request) => {
          return (
            <React.Fragment key={request.id}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(`/${request.id}`);
                  }}
                >
                  <ListItemText
                    onClick={handleClose}
                    primary={request.title}
                    secondary={request.description}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
      <Link
        to="/requestemployees"
        style={{
          textDecoration: "none",
          color: "black",
          marginRight: "20px",
        }}
      >
        <MenuItem onClick={handleClose}>View All Requests</MenuItem>
      </Link>
    </Menu>
  );
};

export default BasicList;
