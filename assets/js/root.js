
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

export default function root_init(node) {
  let tasks = window.tasks;
  ReactDOM.render(<Root tasks={tasks} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
      users: [],
    }
    this.fetch_tasks()

  }

  fetch_tasks() {
    $.ajax("/api/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { tasks: resp.data });
        this.setState(state1);
      },
    });
  }

  fetch_users() {
    $.ajax("/api/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { users: resp.data });
        this.setState(state1);
      },
    });
  }

  render() {
    return <div>
      <Router>
        <div>
          <Header root={this} />
          <Route path="/" exact={true} render={() =>
            <TaskList tasks={this.state.tasks} />
          } />
          <Route path="/users" exact={true} render={() =>
            <UserList users={this.state.users} />
          } />
        </div>
      </Router>
    </div>;
  }
}

function Header(props) {
  let { root } = props;
  return <div className="row my-2">
    <div className="col-6">
      <h1>Task Tracker</h1>
      <div className="col-4">
        <h1><Link to={"/"}>Tasks</Link></h1>
      </div>
      <div className="col-2">
        <p>
          <Link to={"/users"}
            onClick={root.fetch_users.bind(root)}>
            Users
                </Link>
        </p>
      </div>
      <div className="col-6">
        <div className="form-inline my-2">
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button className="btn btn-secondary">Login</button>
        </div>
      </div>
    </div>
  </div>;
}


function TaskList(props) {
  let tasks = _.map(props.tasks, (t) => <Task key={t.id} task={t} />);
  return <div>
    {tasks}
  </div>;
}

function Task(props) {
  let { task } = props;
  return <div className="card row">
    <div className="card-body">
      <h2 className="card-title">{task.title}</h2>
      <p className="card-text">{task.description} <br />
        Time Spent (so far): {task.time_spent}</p>
    </div>
  </div>;
}

function UserList(props) {
  let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
  return <div className="row">
    <div className="col-12">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  </div>;
}

function User(props) {
  let { user } = props;
  return <tr>
    <td>{user.email}</td>
  </tr>;
}
