/*
ATTRIBUTION: NAT TUCK, IN CLASS, for many parts of this file.
*/

import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import api from './api';
import { connect } from 'react-redux'
import store from './store'

function Header(props) {
  let { session, login_form, dispatch } = props;
  let session_info;
  if (session == null) {
    session_info = <div className="form-inline my-2">
      <input type="email" placeholder="email"
        onChange={ (ev) => update_username(ev) } />
      <input type="password" placeholder="password"
        onChange={ (ev) => update_password(ev) } />
      <button className="btn btn-secondary" onClick={() => api.create_session(login_form.email, login_form.password)}>Login</button>
    </div>;
  }
  else {
    session_info = <div className="my-2">
      <p>Logged in as {session.user_id}</p>
    </div>
  }

  let update_username = (ev) => {
    console.log("new username: ", ev.target.value)
    let action = {
      type: "UPDATE_LOGIN_EMAIL",
      login_form: _.assign({}, login_form, { email: ev.target.value })
    }
    dispatch(action);
  }

  let update_password = (ev) => {
    let action = {
      type: "UPDATE_LOGIN_PASSWORD",
      login_form: _.assign({}, login_form, { password: ev.target.value })
    }
    store.dispatch(action);
  }

  return <div className="row my-2">
    <div className="col-4">
      <h1>Task Tracker (SPA!)</h1>
    </div>
    <div className="col-4">
      <p>
        <Link to={"/"}>Tasks</Link> &nbsp; | &nbsp;
        <Link to={"/users"}>Users</Link>
      </p>
    </div>
    <div className="col-4">
      {session_info}
    </div>
  </div>;
}

function state_props_helper(state) {
  return {
    session: state.session,
    login_form: state.login_form
  };
}

export default connect(state_props_helper)(Header);
