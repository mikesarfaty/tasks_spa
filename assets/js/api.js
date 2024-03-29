import store from './store';

class TasksAPI {

  fetch_path(path, callback) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: callback,
    });
  }

  fetch_tasks() {
    this.fetch_path(
      "/api/tasks",
      (resp) => {
        store.dispatch({
          type: 'TASK_LIST',
          data: resp.data,
        });
      }
    );
  }

  fetch_users() {
    this.fetch_path(
      "/api/users",
      (resp) => {
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data,
        });
      }
    );
  }

  send_post(path, data, callback) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
    });
  }

  create_session(email, password) {
    this.send_post(
      "/api/auth", {
        email,
        password
      },
      (resp) => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data,
        });
      }
    );
  }

  create_task(task_form) {
    this.send_post(
      "/api/tasks", {
        task: {
          title: task_form.title,
          description: task_form.description,
          assignee: task_form.assignee,
          is_completed: task_form.is_completed,
          time_spent: task_form.time_spent
        }
      },
      (resp) => {
        console.log(resp);
      }
    );
  }

  send_put(path, data, callback) {
    $.ajax(path, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
    });
  }

  update_task(task_form) {
    this.send_put(
      "/api/tasks/" + task_form.task_id, {
        task: {
          title: task_form.title,
          description: task_form.description,
          assignee: task_form.assignee,
          is_completed: task_form.is_completed,
          time_spent: task_form.time_spent
        }
      },
      (resp) => {
        console.log(resp);
      }
    );
  }
}

export default new TasksAPI();