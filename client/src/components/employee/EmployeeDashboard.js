import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../../assets/styles/employe.css";
import "../../assets/styles/popup.css";
import { AuthContext } from "../../context/authContext";
import getTaskById from "../../graphql/getTaskById";
import TaskDetailPopUp from "../common/TaskDetailPopUp";
import Column from "./columnItem";
import COLUMN_NAMES from "./columnNames";
import MovableItem from "./moveableItem";

const EmployeeDashboard = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleClickOpen = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { user } = useContext(AuthContext);
  const id = user._id;
  const url = "https://betaportal-saimalam.onrender.com/graphql";

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getTaskById(url, { id }).then((result) => {
      if (result) {
        setItems(result.data.getTaskById);
      }
    });
  };

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
        return coppiedStateArray;
      });
    }
  };
  const returnItemsForColumn = (columnName) => {
    return items
      .filter((item) => {
        return item.taskStatus === columnName;
      })
      .map((item, index) => (
        <div key={item._id} onClick={() => handleClickOpen(item)}>
          <MovableItem
            key={item._id}
            name={item.taskName}
            description={item.taskDescription}
            // assignedDate={item.assignedDate}
            assignedDate={moment().format("MMM Do, YYYY")}
            deadlineDate={moment.utc(item.endDate).format("MMM Do, YYYY")}
            currentColumnName={item.taskStatus}
            setItems={setItems}
            index={index}
            moveCardHandler={moveCardHandler}
            updateID={item._id}
          />
        </div>
      ));
  };
  const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES;

  return (
    <div className="task-container">
      <DndProvider backend={HTML5Backend}>
        <Column title={DO_IT} className="task-list-container do-it-column">
          {returnItemsForColumn(DO_IT)}
        </Column>
        <Column
          title={IN_PROGRESS}
          className="task-list-container in-progress-column"
        >
          {returnItemsForColumn(IN_PROGRESS)}
        </Column>
        <Column
          title={AWAITING_REVIEW}
          className="task-list-container awaiting-review-column"
        >
          {returnItemsForColumn(AWAITING_REVIEW)}
        </Column>
        <Column title={DONE} className="task-list-container done-column">
          {returnItemsForColumn(DONE)}
        </Column>
      </DndProvider>
      {open && selectedTask && (
        <TaskDetailPopUp
          task={selectedTask}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
          open={open}
        />
      )}
    </div>
  );
};

export default EmployeeDashboard;
