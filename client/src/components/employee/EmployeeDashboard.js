import "../../assets/styles/employe.css";
import React, { useState, useEffect, useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./columnItem";
import COLUMN_NAMES from "./columnNames";
import { tasks } from "./tasks";
import MovableItem from "./moveableItem";
import getTaskById from "../../graphql/getTaskById";
import { AuthContext } from "../../context/authContext";
import "../../assets/styles/popup.css";
import CustomizedDialogs from "./TaskDetailPop";
import moment from "moment";

const EmployeeDashboard = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClickOpen = (name, description) => {
    console.log(name, description, "handleClickOpen");
    setTitle(name);
    setDescription(description);
    setOpen(true);
  };

  const { user } = useContext(AuthContext);
  const id = user._id;
  const url = "http://localhost:4000/graphql";

  useEffect(() => {
    loadData();
    // setItems(tasks);
  }, []);

  const loadData = () => {
    getTaskById(url, { id }).then((result) => {
      setItems(result.data.getTaskById);
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
          handleClickOpen={handleClickOpen}
          updateID={item._id}
        />
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
      <CustomizedDialogs
        open={open}
        setOpen={setOpen}
        title={title}
        description={description}
      />
    </div>
  );
};

export default EmployeeDashboard;
