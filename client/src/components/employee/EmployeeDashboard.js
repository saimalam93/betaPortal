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

const EmployeeDashboard = () => {
  const [items, setItems] = useState([]);
  const { user } = useContext(AuthContext);
  const id = user._id;
  const url = "http://localhost:4000/graphql";

  useEffect(() => {
    loadData();
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
        console.log(item);
        return item.column === columnName;
      })
      .map((item, index) => (
        <MovableItem
          key={item.id}
          name={item.name}
          description={item.description}
          assignedDate={item.assignedDate}
          deadlineDate={item.deadlineDate}
          currentColumnName={item.column}
          setItems={setItems}
          index={index}
          moveCardHandler={moveCardHandler}
        />
      ));
  };
  const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES;

  return (
    <div className="task-container">
      <DndProvider backend={HTML5Backend}>
        <Column title={DO_IT} className="task-list-container ">
          {returnItemsForColumn(DO_IT)}
        </Column>
        <Column title={IN_PROGRESS} className="task-list-container ">
          {returnItemsForColumn(IN_PROGRESS)}
        </Column>
        <Column title={AWAITING_REVIEW} className="task-list-container ">
          {returnItemsForColumn(AWAITING_REVIEW)}
        </Column>
        <Column title={DONE} className="task-list-container ">
          {returnItemsForColumn(DONE)}
        </Column>
      </DndProvider>
    </div>
  );
};

export default EmployeeDashboard;
