import { useState } from "react";
import "../assets/styles/dashboard.css";
import ScheduleIcon from '@mui/icons-material/Schedule';
import VerifiedIcon from '@mui/icons-material/Verified';

function Tasks() {
  const [cards] = useState([
    {
      title: 'Task 1 : Due Today',
      text1: `Create graphs for dashboard`,
      text2: `Description: Pie chart showing growth of the project`,
      text3: `Status: Done`,
      text4: `Project: Vision 3D`,
      flag: `true`,

    },
    {
      title: 'Task 2 : Due on 15th Dec',
      text1: `Update API of the rent table and change datatype of columns specific to value.`,
      text2: `Description: Add column for Image and update datatype of price to Decimal`,
      text3: `Status: Done`,
      text4: `Project: Health Care`,
    },
    {
      title: 'Task 3 : Due on 20th Dec',
      text1: `Delete customer who are not eligible for upgrade of mobile device and sim.`,
      text2: `Description: Delete with specific id which matches to the first time user.`,
      text3: `Status: Doing`,
      text4: `Project: Capstone`,
      flag: `false`,
    },
    {
      title: 'Task 4 : Due on 22th Dec',
      text1: `Fix design for rent listing with respect to AODA complaince style.`,
      text2: `Description: Desing using mui and Ant design for specific requirements.`,
      text3: `Status: Doing`,
      text4: `Project: Robotics`,
    },
   
  ])
  
 
  return (

    <div class="section">
      <section>
        <div className="container1">
          <h1 align="center">My dashboard</h1>
          <div className="cards">
            {
              cards.map((card, i) => (

                <div key={i} className="card">
                  <h2>{card.title}</h2>
                  <br />
                  <p>{card.text1}</p>
                  <p>{card.text2}</p>
                  <p>{card.text4}</p>
                  <p>{card.text3}</p>
                </div>
              ))
            }
          </div>
        
        </div>
      </section>

    </div>

  );
}

export default Tasks;
