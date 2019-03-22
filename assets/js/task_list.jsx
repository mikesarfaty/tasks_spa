
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';


export default connect(({ tasks }) => { return { tasks }; })((props) => {
  let { tasks, dispatch } = props;
  let tasks_jsx = _.map(props.tasks, (t) => <Task key={t.id} task={t} dispatch={dispatch} />);
  return <div>
    <Link to={"/tasks/new"} className="btn btn-primary">New Task</Link>
    {tasks_jsx}
  </div>;
});

function Task(props) {
  let { task, dispatch } = props;
  console.log(props);
  let assigned_to = (task.assigned_to) ? task.assigned_to : 'No One!';

  let update_form = (task) => {
    dispatch({
      type: "UPDATE_TASK_FORM_SET",
      task_form: {
        title: task.title,
        description: task.description,
        assignee: task.assigned_to,
        time_spent: task.time_spent,
        task_id: task.id,
        is_completed: task.is_completed
      }
    })
  }

  let set_info = (task) => {
    dispatch({
      type: "SHOW_TASK_INFO_SET",
      task_info: {
        title: task.title,
        description: task.description,
        assignee: task.assigned_to,
        time_spent: task.time_spent,
        task_id: task.id,
        is_completed: task.is_completed
      }
    })
  }

  return <div className="card row">
    <div className="card-body col-7">
      <h2 className="card-title">{task.title}</h2>
      <p className="card-text">Time Spent (so far): {task.time_spent}</p>
      <p className="card-text">Assigned to: {assigned_to}</p>
    </div>
    <div className="">
      <Link to={"/tasks/new"} className="btn btn-secondary" onClick={(ev) => update_form(task)}>
        Update Task
      </Link>
      <Link to={"/tasks/view"} className="btn btn-info" onClick={(ev) => set_info(task)}>
        More Info
      </Link>
    </div>
  </div>;

}