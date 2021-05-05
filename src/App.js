import React from "react";
import "./App.css";
import users from "./users.json";
import linkedIn from "./linkedin.png";

class App extends React.Component {
  state = {
    users: users,
    search: "",
    student: true,
    teacher: true,
    campus: "",
  };

  handleSearchInput = (event) => {
    this.setState({
      search: event.target.value,
      users: users.filter((user) => {
        return (
          user.firstName.toLowerCase().includes(event.target.value) ||
          user.lastName.toLowerCase().includes(event.target.value)
        );
      }),
    });
  };

  handleStudentCheck = (event) => {
    this.setState({
      student: event.target.checked,
      users: users.filter((user) => {
        return (
          (user.role === "student" && event.target.checked) ||
          (user.role === "teacher" && this.state.teacher)
        );
      }),
    });
  };

  handleTeacherCheck = (event) => {
    this.setState({
      teacher: event.target.checked,
      users: users.filter((user) => {
        return (
          (user.role === "student" && this.state.student) ||
          (user.role === "teacher" && event.target.checked)
        );
      }),
    });
  };

  handleCampusOption = (event) => {
    this.setState({
      users: users.filter((user) => {
        return user.campus === event.target.value;
      }),
    });
  };

  render() {
    const users = this.state.users.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.campus}</td>
          <td>{user.role}</td>
          <td>
            {user.linkedin && (
              <a href={user.linkedin}>
                <img
                  src={linkedIn}
                  alt="LinkedIn logo"
                  style={{ width: "20px" }}
                />
              </a>
            )}
          </td>
        </tr>
      );
    });

    return (
      <div className="App">
        <h1>IronBook</h1>
        <input
          type="text"
          name="search"
          id="search"
          value={this.state.query}
          onChange={this.handleSearchInput}
          className="search"
          placeholder="Search by name"
        />
        <div className="filter-options">
          <div className="student">
            <input
              type="checkbox"
              name="student"
              checked={this.state.student}
              onChange={this.handleStudentCheck}
            />
            <label htmlFor="student">Student</label>
          </div>

          <div className="teacher">
            <input
              type="checkbox"
              name="teacher"
              checked={this.state.teacher}
              onChange={this.handleTeacherCheck}
            />
            <label htmlFor="teacher">Teacher</label>
          </div>

          <div className="campus">
            <label htmlFor="campus">Campus: </label>
            <select
              name="campus"
              value={this.state.campus}
              onChange={(event) => this.handleCampusOption(event)}
            >
              <option value={this.state.campus}>{this.state.campus}</option>
              <option value="Berlin">Berlin</option>
              <option value="Paris">Paris</option>
              <option value="Lisbon">Lisbon</option>
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Campus</th>
              <th>Role</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>{users}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
