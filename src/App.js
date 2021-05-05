import React from "react";
import "./App.css";
import users from "./users.json";
import linkedIn from "./linkedin.png";

class App extends React.Component {
  state = {
    users: users,
    search: "",
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
