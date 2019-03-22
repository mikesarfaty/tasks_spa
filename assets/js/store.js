/*
ATTRIBUTION: NAT TUCK, IN CLASS, for the beginnings of this file
*/

import {
    createStore,
    combineReducers
} from 'redux';
import deepFreeze from 'deep-freeze';

function tasks(state = [], action) {
    switch (action.type) {
        case 'TASK_LIST':
            return action.data;
        default:
            return state;
    }
}

function users(state = [], action) {
    switch (action.type) {
        case 'USER_LIST':
            return action.data;
        default:
            return state;
    }
}

function session(state = null, action) {
    switch (action.type) {
        case 'NEW_SESSION':
            return action.data;
        default:
            return state;
    }
}

let login_form0 = {
    email: "",
    password: ""
};

function login_form(state = login_form0, action) {
    switch (action.type) {
        case 'UPDATE_LOGIN_EMAIL':
            return action.login_form;
        case 'UPDATE_LOGIN_PASSWORD':
            return action.login_form;
        default:
            return state;
    }
    return state;
}

let task_form0 = {
    task_id: null,
    title: "",
    description: "",
    is_completed: true,
    assignee: "",
    time_spent: 0,
}

function task_form(state = task_form0, action) {
    switch (action.type) {
        case 'UPDATE_TASK_FORM_TITLE':
            return action.task_form;
        case 'UPDATE_TASK_FORM_DESCRIPTION':
            return action.task_form;
        case 'UPDATE_TASK_FORM_ASSIGNEE':
            return action.task_form;
        case 'UPDATE_TASK_FORM_COMPLETED':
            return action.task_form;
        case 'UPDATE_TASK_FORM_TIME_SPENT':
            return action.task_form;
        case 'UPDATE_TASK_FORM_CLEAR':
            return task_form0;
        case 'UPDATE_TASK_FORM_SET':
            return action.task_form
        default:
            return state;
    }
    return state;
}

let task0 = {
    title: "",
    description: "",
    time_spent: 0,
    assignee: "",
    is_completed: false
}

function show_task_info(state = task0, action) {
    switch (action.type) {
        case 'SHOW_TASK_INFO_SET':
            return action.task_info;
        default:
            return state
    }
    return state;
}

function root_reducer(state0, action) {
    console.log("reducer", state0, action);

    let reducer = combineReducers({
        tasks,
        users,
        session,
        show_task_info,
        login_form,
        task_form
    });
    let state1 = reducer(state0, action);

    console.log("reducer1", state1);

    return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;