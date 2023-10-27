import { useDrop } from "react-dnd";
import COLUMN_NAMES from "./columnNames";

const Column = ({ children, className, title }) => {
  const [, drop] = useDrop({
    accept: "Our first type",
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    // Override monitor.canDrop() function
    canDrop: (item) => {
      const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES;
      const { currentColumnName } = item;

      return (
        currentColumnName === title ||
        (currentColumnName === DO_IT && title === IN_PROGRESS) ||
        (currentColumnName === IN_PROGRESS &&
          (title === DO_IT || title === AWAITING_REVIEW)) ||
        (currentColumnName === AWAITING_REVIEW &&
          (title === IN_PROGRESS || title === DONE)) ||
        (currentColumnName === DONE && title === AWAITING_REVIEW)
      );
    },
  });

  return (
    <div ref={drop} className={className}>
      <p className="title">{title}</p>
      {children}
    </div>
  );
};

export default Column;
