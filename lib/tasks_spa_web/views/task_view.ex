defmodule TasksSpaWeb.TaskView do
  use TasksSpaWeb, :view
  alias TasksSpaWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    case task.user do
      %{:email => email} -> # has an email field
        %{
        id: task.id,
        title: task.title,
        description: task.description,
        time_spent: task.time_spent,
        is_completed: task.is_completed,
        assigned_to: task.user.email
      }
    _ ->
      %{
        id: task.id,
        title: task.title,
        description: task.description,
        time_spent: task.time_spent,
        is_completed: task.is_completed,
        assigned_to: ""
      }
    end
  end
end
