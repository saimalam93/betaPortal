import moment from "moment";
import React, { useState } from "react";

import TimerIcon from "@mui/icons-material/Timer";

import "../../../assets/styles/employe.css";
import deleteTask from "../../../graphql/deleteTask";
import TaskDetailPopUp from "../../common/TaskDetailPopUp";

function UndragableDashborad({ tasks, setTasks }) {
  const statuses = ["Todo", "In Progress", "Awaiting review", "Done"];
  const url = "http://localhost:4000/graphql";
  const [selectedTask, setSelectedTask] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // -----------On click get Id-----------
  const deletebtn = (id) => {
    deleteTask(url, { id }).then((result) => {
      setTasks(tasks.filter((task) => task._id !== id));
      handleClose();
    });
  };

  function TaskCard({ item }) {
    return (
      <div
        className="movable-item task-card"
        id={item._id}
        onClick={() => handleClickOpen(item)}
      >
        <div className="task-card-header">
          <p className="heading-text">{item.taskName}</p>
        </div>
        <div className="task-card-info">
          <p className="info-text">{item.taskDescription}</p>
          <div className="deadline">
            <span className="alarm-icon">
              <TimerIcon fontSize="20" />
            </span>
            <p className="date-text">
              <span>Deadline:</span>{" "}
              {moment(item.endDate).format("MMM Do YYYY")}
            </p>
          </div>
        </div>
        <div className="task-card-footer">
          <p>Assign to: {item.taskEmployee.fname}</p>
        </div>

        {open && (
          <TaskDetailPopUp
            task={selectedTask}
            handleClose={handleClose}
            handleClickOpen={handleClickOpen}
            open={open}
            id={item._id}
          />
        )}
      </div>
    );
  }

  function TaskColumn({ title, items }) {
    return (
      <div className="task-list-container">
        <p className="title">{title}</p>
        <div className="task-list">
          {items.map((item) => (
            <TaskCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="task-container">
        {statuses.map((status) => (
          <TaskColumn
            key={status}
            title={status}
            items={tasks.filter((item) => item.taskStatus === status)}
          />
        ))}
      </div>
      {open && selectedTask && (
        <TaskDetailPopUp
          task={selectedTask}
          handleClose={handleClose}
          open={open}
          deletebtn={deletebtn}
          id={selectedTask._id}
        />
      )}
    </div>
  );
}

export default UndragableDashborad;
