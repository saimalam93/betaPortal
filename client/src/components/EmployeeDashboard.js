import { useState } from "react";
import "../assets/styles/dashboard.css";

function Tasks() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTask = (index) => {
    setToggleState(index);
  };
  
  return (
    <div>
    <h1 class="text-center">My dashboard</h1>
    <div className="container">
   
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "task active-task" : "task"}
          onClick={() => toggleTask(1)}
        >
          Project Task
        </button>
        <button
          className={toggleState === 2 ? "task active-task" : "task"}
          onClick={() => toggleTask(2)}
        >
          Personal Task
        </button>
        <button
          className={toggleState === 3 ? "task active-task" : "task"}
          onClick={() => toggleTask(3)}
        >
          News
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h2>Task 1</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            praesentium incidunt quia aspernatur quasi quidem facilis quo nihil
            vel voluptatum?
          </p>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Task 2</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            voluptatum qui adipisci.
          </p>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2>Company News</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed
            nostrum rerum laudantium totam unde adipisci incidunt modi alias!
            Accusamus in quia odit aspernatur provident et ad vel distinctio
            recusandae totam quidem repudiandae omnis veritatis nostrum
            laboriosam architecto optio rem, dignissimos voluptatum beatae
            aperiam voluptatem atque. Beatae rerum dolores sunt.
          </p>
        </div>
      </div>
    </div>
    </div>

  );
}

export default Tasks;