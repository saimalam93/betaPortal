
import "../../assets/styles/employe.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TimerIcon from '@mui/icons-material/Timer';

import Draggable from "react-draggable";

function Tasks() {



  return (
    <div class="section">
      <section>
        <div className="task-container">
          <div className="task-list-container">
            <p className="title">To do</p>

            <div className="task-list">
            <Draggable>
              <div className="task-card">
                <div className="task-card-header">
                  <p className="heading-text">Lorem Ipsum is simply</p>
                  <MoreHorizIcon />
                </div>
                <div className="task-card-info">
                  <p className="info-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </p>
                  <div className="deadline">
                    <span className="alarm-icon"><TimerIcon fontSize="20" /></span><p className="date-text"><span>Deadline:</span> 11th - 15th Aug 2023</p></div>
                </div>
                <div className="task-card-footer">
                  <p>Assign</p>
                </div>
              </div>
            </Draggable>
            </div>
          </div>
          <div className="task-list-container">
            <p className="title">Doing</p>
            <div className="task-list">
            <Draggable>
              <div className="task-card">
                <div className="task-card-header">
                  <p className="heading-text">Lorem Ipsum is simply</p>
                  <MoreHorizIcon />
                </div>
                <div className="task-card-info">
                  <p className="info-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </p>
                  <div className="deadline">
                    <span className="alarm-icon"><TimerIcon fontSize="20" /></span><p className="date-text"><span>Deadline:</span> 11th - 15th Aug 2023</p></div>
                </div>
                <div className="task-card-footer">
                  <p>Assign</p>
                </div>
              </div>
            </Draggable>
            </div>
          </div>
          <div className="task-list-container">
            <p className="title">Done</p>
            <div className="task-list">
            <Draggable>
              <div className="task-card">
                <div className="task-card-header">
                  <p className="heading-text">Lorem Ipsum is simply</p>
                  <MoreHorizIcon />
                </div>
                <div className="task-card-info">
                  <p className="info-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </p>
                  <div className="deadline">
                    <span className="alarm-icon"><TimerIcon fontSize="20" /></span><p className="date-text"><span>Deadline:</span> 11th - 15th Aug 2023</p></div>
                </div>
                <div className="task-card-footer">
                  <p>Assign</p>
                </div>
              </div>
            </Draggable>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Tasks;
