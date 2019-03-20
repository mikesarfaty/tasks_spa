defmodule TasksSpa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :description, :string
    field :is_completed, :boolean, default: false
    field :title, :string
    field :time_spent, :decimal, default: 0.0
    belongs_to :user, TasksSpa.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :is_completed, :time_spent])
    |> validate_required([:title, :description, :is_completed, :time_spent])
  end
end
