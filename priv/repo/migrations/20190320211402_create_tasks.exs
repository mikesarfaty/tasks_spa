defmodule TasksSpa.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string, null: false
      add :description, :string, null: false
      add :time_spent, :decimal, null: false, default: 0
      add :is_completed, :boolean, default: false, null: false
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:tasks, [:user_id])
  end
end
