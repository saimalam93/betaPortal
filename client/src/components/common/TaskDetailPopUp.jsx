import moment from "moment";
import * as React from "react";

import { Button } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import "../../assets/styles/popup.css";

import CloseIcon from "@mui/icons-material/Close";
import TimerIcon from "@mui/icons-material/Timer";
import CommentBox from "../manager/components/CommentBox";

export default function TaskDetailPopUp({
  task,
  handleClose,
  open,
  id,
  deletebtn,
  hidden,
}) {
  console.log(id);
  return (
    <div>
      <Dialog
        onClose={handleClose}
        open={open}
        sx={{
          borderRadius: 16,
        }}
        className="opendDialog"
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className="dialog-close"
        >
          <CloseIcon />
        </IconButton>
        <div className="dialog-wrap">
          <div className="dialog-title-wrap">
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              {task.taskName}
            </DialogTitle>
            <div
              className={`state-btn ${
                task.taskStatus === "Todo"
                  ? "todo-btn"
                  : task.taskStatus === "In Progress"
                  ? "doing-btn"
                  : task.taskStatus === "Done"
                  ? "done-btn"
                  : " in-review-btn"
              }`}
              disableElevation
              variant="contained"
            >
              {task.taskStatus}
            </div>
          </div>

          <DialogContent dividers>
            <Typography className="dialog-subtitle">Overview</Typography>
            <Typography className="grey-Text">
              {task.taskDescription}
            </Typography>
            <div className="deadline">
              <span className="alarm-icon">
                <TimerIcon fontSize="20" />
              </span>
              <p className="date-text">
                <span>Deadline:</span>{" "}
                {moment(task.endDate).format("MMM Do YYYY")}
              </p>
            </div>
          </DialogContent>
          <DialogContent>
            <CommentBox />
          </DialogContent>
        </div>
        {!hidden && (
          <Button
            variant="outlined"
            style={{
              color: "red",
              border: "1px solid #de2d2d9c",
              width: "60%",
              margin: "0 auto 20px auto",
            }}
            endIcon={<DeleteIcon />}
            onClick={() => deletebtn(id)}
          >
            Delete task
          </Button>
        )}
      </Dialog>
    </div>
  );
}
