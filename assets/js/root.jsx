
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './header'
import UserList from './user_list';
import TaskList from './task_list';
import TaskForm from './task_form'
import ShowTask from './show_task'
import { Provider } from 'react-redux';

import api from './api';

export default function root_init(node, store) {
  let tasks = window.tasks;
  ReactDOM.render(
    <Provider store={store}>
      <Root tasks={tasks} />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    api.fetch_tasks();
    api.fetch_users();
  }

  render() {
    return <div>
      <Router>
        <div>
          <Header />
          <Route path="/" exact={true} render={() =>
            <TaskList />
          } />
          <Route path="/tasks/new" exact={true} render={() =>
            <TaskForm />
          } />
          <Route path="/tasks/edit" exact={true} render={() =>
            <TaskForm />
          } />
          <Route path="/users" exact={true} render={() =>
            <UserList />
          } />
          <Route path="/tasks/view" exact={true} render={() =>
            <ShowTask />
          } />
        </div>
      </Router>
    </div>;
  }
}