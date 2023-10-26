import "../../../assets/styles/employe.css";
import React, { useState,useEffect } from "react";
import getAllTasks from '../../../graphql/getAllTasks';
import TaskDetailPop from '../../common/TaskDetailPop'
import moment from "moment";
import { Button } from '@material-ui/core';
import TimerIcon from '@mui/icons-material/Timer';
import DeleteIcon from '@mui/icons-material/Delete';

function UndragableDashborad() {

  const statuses = ["Todo", "In progress", "Awaiting review", "Done"];
  const url = "http://localhost:4000/graphql";
  const [task, setTask] = useState([]);
  const [index, setIndex] = useState();

  useEffect(() => {
    loadData();
}, []);

const loadData = async () => {
    await getAllTasks(url).then((result) => {
        setTask(result.data.getTasks);
    });
};

// -----------On click get Id-----------
const deletebtn = (key) => {
  setIndex(key)
  // get the id here
  console.log('Deleting item with ID:', key);
};


  function TaskCard({ item }) {
  // const { taskName, taskDescription, endDate, taskEmployee } = item;
    return (
      <div className="movable-item task-card" id={item._id}>
        <div className="task-card-header">
          <p className="heading-text">{item.taskName}</p>
          <TaskDetailPop task={item} key={item._id}/>
        </div>
        <div className="task-card-info">
          <p className="info-text">{item.taskDescription}</p>
          <div className="deadline">
            <span className="alarm-icon"><TimerIcon fontSize="20" /></span>
            <p className="date-text"><span>Deadline:</span> {moment(item.endDate).format("MMM Do YYYY")}</p>
          </div>
        </div>
        <div className="task-card-footer">
          <p>Assign to: {item.taskEmployee.fname}</p>
        </div>
        <Button variant="outlined" endIcon={<DeleteIcon />} onClick={() => deletebtn(item._id)}>
					Delete task
				</Button>
      </div>
    );
  }

  function TaskColumn({ title, items}) {
    return (
      <div className="task-list-container">
        <p className="title">{title}</p>
        <div className="task-list">
          {items.map(item => (
            <TaskCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="task-container">
        {statuses.map(status => (
          <TaskColumn
            key={status}
            title={status}
            items={task.filter(item => item.taskStatus
              === status)}
          />
        ))}
      </div>
    </div>
  );
}

export default UndragableDashborad;
