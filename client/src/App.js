import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [employees, setEmployees] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name,
      age,
      country,
      position,
      wage,
    })
      .then(() => {
        // setEmployees([
        //   ...employees,
        //   {
        //     name,
        //     age,
        //     country,
        //     position,
        //     wage,
        //   },
        // ]);
        getEmployees();
      })
      .catch((err) => console.log("req", err));
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees")
      .then((response) => {
        debugger;
        console.log("response", response);
        setEmployees(response?.data);
      })
      .catch((err) => {
        debugger;
        console.log("err", err);
      });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Wage (year):</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>

      <br />
      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>

        {employees?.map((val, key) => {
          return (
            <div className="employee" key={key}>
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Wage: {val.wage}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
