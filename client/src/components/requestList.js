import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import viewAllRequests from "../graphql/viewAllRequests";

const BasicList = ({ anchorEl, handleClose, open }) => {
  const navigate = useNavigate();
  const url = "https://betaportal-saimalam.onrender.com/graphql";
  const [requests, setRequests] = useState([]);

  let filters = {};

  useEffect(() => {
    loadData(filters);
  }, []);

  const loadData = (filters) => {
    viewAllRequests(url, filters).then((result) => {
      setRequests(result.data.viewAllRequests);
    });
  }; // end of loadData
  return (
    <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
      <List sx={{ width: "450px", maxWidth: 500 }}>
        {requests.map((request) => {
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
                    primary={request.request_subject}
                    secondary={request.reason}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
      <Link
        to="/listrequest"
        style={{
          textDecoration: "none",
          color: "white",
          marginRight: "20px",
        }}
      >
        <MenuItem onClick={handleClose}>View All Requests</MenuItem>
      </Link>
    </Menu>
  );
};

export default BasicList;
