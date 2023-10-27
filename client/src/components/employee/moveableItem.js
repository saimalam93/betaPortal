import React, { useRef } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TimerIcon from '@mui/icons-material/Timer';
import { useDrag, useDrop } from "react-dnd";
import COLUMN_NAMES from './columnNames';
import updateTaskStatus  from "../../graphql/updateTaskStatus";

 const MovableItem = ({
    name,
    description,
    index,
    deadlineDate,
    currentColumnName,
    assignedDate,
    moveCardHandler,
    setItems,
    updateID,
  }) => {

    const url = "http://localhost:4000/graphql";



    const changeItemColumn = (currentItem, columnName) => {

      setItems((prevState) => {
        let task = {
          _id : updateID,
          taskStatus: columnName
        }

        updateTaskStatus(url, {task})
        return prevState.map((e) => {

          return {
            ...e,
            taskStatus: e.taskName === currentItem.name ? columnName : e.taskStatus
          };
        });
      });

    };

    const ref = useRef(null);

    const [, drop] = useDrop({
      accept: "Our first type",
      hover(item, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        // Time to actually perform the action
        moveCardHandler(dragIndex, hoverIndex);
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;

      }
    });

    const [{ isDragging }, drag] = useDrag({
      type: "Our first type",
      item: { index, name, currentColumnName },

      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
      //  console.log(item);
        if (dropResult) {
          const { name } = dropResult;
          const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES;
          switch (name) {
            case IN_PROGRESS:
              changeItemColumn(item, IN_PROGRESS);
              break;
            case AWAITING_REVIEW:
              changeItemColumn(item, AWAITING_REVIEW);
              break;
            case DONE:
              changeItemColumn(item, DONE);
              break;
            case DO_IT:
              changeItemColumn(item, DO_IT);
              break;
            default:
              break;
          }
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    });

    const opacity = isDragging ? 0.4 : 1;

    drag(drop(ref));

    return (
      <div ref={ref} className="movable-item task-card" style={{ opacity }} >
        <div className="task-card-header">
          <p className="heading-text">{name}</p>
        </div>
        <div className="task-card-info">
          <p className="info-text">
            {description}
          </p>
          <div className="deadline">
            <span className="alarm-icon"><TimerIcon fontSize="20" /></span><p className="date-text"><span>Deadline:</span> {deadlineDate}</p></div>
        </div>
        <div className="task-card-footer">
          <p><span>Assign on:</span> {assignedDate}</p>
        </div>
      </div>
    );
  };

  export default MovableItem;