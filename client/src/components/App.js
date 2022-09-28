import logo from "../assets/images//logo.svg";
import "../assets/styles/App.css";
import React, { useEffect, useState } from "react";
import listAllEmployees from "../graphql/listAllEmployees";

const App = () => {
  const url = "http://localhost:4000/graphql";

  const [employees, setEmployees] = useState([]);

  let filters = {};

  useEffect(() => {
    loadData(filters);
  }, []);

  const loadData = (filters) => {
    listAllEmployees(url, filters).then((result) => {
      setEmployees(result.data.listAllEmployees);
    });
  }; // end of loadData

  return (
    <div className="App">
      <div>
        {employees.map((employee) => (
          <div key={employee._id}>
            {employee.fname} {employee.lname}
          </div>
        ))}
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
