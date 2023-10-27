import {
  Avatar,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import TaskDetailPopUp from "../../../components/common/TaskDetailPopUp";

const avatars = [1, 2, 3, 4];

export default function TaskForReviewList({ tasks }) {
  const [index, setIndex] = useState();
  const [selectedTask, setSelectedTask] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      <Typography variant="subtitle1" component="body1">
        All the tasks
      </Typography>

      {tasks.length > 0 ? (
        <TableContainer>
          <Table>
            <TableBody>
              {tasks.map((task, count) => (
                <TableRow
                  hover={true}
                  style={{ fontSize: "4rem" }}
                  key={task.taskNum}
                  onClick={() => {
                    setIndex(count);
                    handleClickOpen();
                    setSelectedTask(task); // set the clicked task
                  }}
                >
                  <TableCell component="th" scope="row">
                    <CardHeader
                      avatar={
                        <Avatar
                          src={`/assets/images/avatar${count}.png`}
                          key={count}
                        />
                      }
                      title={`${task.taskEmployee.fname} ${task.taskEmployee.lname}`}
                    />
                  </TableCell>
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell style={{ textAlign: "end" }}>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>No tasks available</div>
      )}
      {open && (
        <TaskDetailPopUp
          task={selectedTask}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
          open={open}
          index={index}
          hidden={true}
        />
      )}
    </Card>
  );
}
