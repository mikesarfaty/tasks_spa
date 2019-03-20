defmodule TasksSpa.Repo do
  use Ecto.Repo,
    otp_app: :tasks_spa,
    adapter: Ecto.Adapters.Postgres
end
