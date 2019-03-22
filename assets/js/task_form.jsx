import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import api from './api';
import { connect } from 'react-redux'

function TaskForm(props) {
    let { task_form, dispatch } = props;
    let btn_new = <div className="row">
        <Link to={"/"} className="btn btn-primary" onClick={(ev) => submit()}>Submit</Link>
    </div>;
    let btn_update = <div className="row">
        <Link to={"/tasks/view"} className="btn btn-secondary" onClick={(ev) => update()}>Update</Link>
    </div>;
    let button = (task_form.task_id == null) ? btn_new : btn_update;
    let form_options = <div className="">
        <div className="form-group">
            <label>Title</label>
            <input className="form-control" type="text" placeholder="Title"
                onChange={(ev) => update_title(ev)} defaultValue={task_form.title} />
            <br />
        </div>
        <div className="form-group">
            <label>Description</label>
            <input className="form-control" type="text" placeholder="Description"
                onChange={(ev) => update_description(ev)}
                defaultValue={task_form.description} />
            <br />
        </div>
        <div className="form-group">
            <label>Assignee</label>
            <input className="form-control" type="text" placeholder="Assignee (email)"
                onChange={(ev) => update_assignee(ev)}
                defaultValue={task_form.assignee} />
            <br />
        </div>
        <div className="form-check">
            <input className="form-check-input" type="checkbox"
                onChange={(ev) => update_completed(ev)}
                defaultValue={(task_form.is_completed) ? "on" : "off"} />
            <label className="form-check-label">Complete?</label>
        </div>
        <div className="form-group">
            <label>Time Spent</label>
            <input className="form-control" type="number" placeholder={0}
                onChange={(ev) => update_time_spent(ev)}
                defaultValue={task_form.time_spent} />
        </div>
        {button}
    </div >;

    let update_title = (ev) => {
        let action = {
            type: "UPDATE_TASK_FORM_TITLE",
            task_form: _.assign({}, task_form, { title: ev.target.value })
        }
        dispatch(action);
    }

    let update_description = (ev) => {
        let action = {
            type: "UPDATE_TASK_FORM_DESCRIPTION",
            task_form: _.assign({}, task_form, { description: ev.target.value })
        }
        dispatch(action);
    }

    let update_assignee = (ev) => {
        let action = {
            type: "UPDATE_TASK_FORM_ASSIGNEE",
            task_form: _.assign({}, task_form, { assignee: ev.target.value })
        }
        dispatch(action);
    }

    let update_completed = (ev) => {
        let action = {
            type: "UPDATE_TASK_FORM_COMPLETED",
            task_form: _.assign({}, task_form, { is_completed: ev.target.value == "on" })
        }
        dispatch(action);
    }

    let update_time_spent = (ev) => {
        let action = {
            type: "UPDATE_TASK_FORM_TIME_SPENT",
            task_form: _.assign({}, task_form, { time_spent: ev.target.value })
        }
        dispatch(action);
    }

    let submit = (ev) => {
        let action = {
            type: "NEW_TASK",
            task_form: task_form
        }
        api.create_task(task_form);
        dispatch(action);
        dispatch({
            type: "SHOW_TASK_INFO_SET",
            task_info: task_form
        })
        dispatch({ type: "UPDATE_TASK_FORM_CLEAR" })
        setInterval(100, api.fetch_tasks);
    }

    let update = (ev) => {
        let action = {
            type: "NEW_TASK",
            task_form: task_form
        }
        api.update_task(task_form);
        dispatch(action);
        dispatch({
            type: "SHOW_TASK_INFO_SET",
            task_info: task_form
        })
        dispatch({ type: "UPDATE_TASK_FORM_CLEAR" })
        setInterval(100, api.fetch_tasks);
    }

    return <div className="row my-2">
        {form_options}
    </div>;
}

function state_props_helper(state) {
    return {
        session: state.session,
        task_form: state.task_form
    };
}

export default connect(state_props_helper)(TaskForm);
