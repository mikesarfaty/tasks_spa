defmodule TasksSpaWeb.Router do
  use TasksSpaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TasksSpaWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/tasks/new", PageController, :index
  end

  scope "/api", TasksSpaWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/tasks", TaskController, except: [:new, :edit]
    post "/auth", AuthController, :authenticate
  end

end
