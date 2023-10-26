
import "../../assets/styles/employe.css";
import React, {  useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./columnItem";
import COLUMN_NAMES from './columnNames';
import { tasks } from "./tasks";
import MovableItem from "./moveableItem";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import CommentBox from '../manager/components/CommentBox';

import "../../assets/styles/popup.css"
import CustomizedDialogs from "./TaskDetailPop";



const EmployeeDashboard = () => {
  const [items, setItems] = useState(tasks);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    console.log("open")
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
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
      .filter((item) => item.column === columnName)
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
          handleClickOpen={handleClickOpen}
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
        <Column
          title={AWAITING_REVIEW}
          className="task-list-container "
        >
          {returnItemsForColumn(AWAITING_REVIEW)}
        </Column>
        <Column title={DONE} className="task-list-container ">
          {returnItemsForColumn(DONE)}
        </Column>
      </DndProvider>
      <CustomizedDialogs open={open} setOpen={setOpen}/>
      
    </div>
  );
}

export default EmployeeDashboard;
