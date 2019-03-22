import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

function ShowTask(props) {
    let { show_task_info, dispatch } = props;
    let goBack = <div>
        <Link className="btn btn-success" to={'/'}>
            See all tasks
        </Link>
    </div>;
    let updateTask = <div>
        <Link className="btn btn-secondary" to={'/tasks/edit'}
            onClick={(ev) => set_edited_task(show_task_info)}>
            Update this task
     </Link>
    </div>;

    let set_edited_task = (show_task_info) => {
        let action = {
            type: "UPDATE_TASK_FORM_SET",
            task_form: show_task_info
        }
        dispatch(action)
    }


    return <div>
        <h1>{show_task_info.title}</h1>
        <h4>Assigned to: {show_task_info.assignee}</h4>
        <p>{show_task_info.description}</p>
        <p>Worked on for: {show_task_info.time_spent} hrs</p>
        <div className="row">
            {goBack}
            {updateTask}
        </div>
    </div>
}


function state_props_helper(state) {
    return {
        show_task_info: state.show_task_info
    };
}

export default connect(state_props_helper)(ShowTask);