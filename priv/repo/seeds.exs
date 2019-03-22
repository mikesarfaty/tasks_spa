# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TasksSpa.Repo.insert!(%TasksSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
#

alias TasksSpa.Repo
alias TasksSpa.Users.User
alias TasksSpa.Tasks.Task

pwhash = Argon2.hash_pwd_salt("password")

Repo.insert!(%User{email: "alice@example.com", password_hash: pwhash})
Repo.insert!(%User{email: "mike@sarfaty.com", password_hash: pwhash})

Repo.insert!(%Task{
  title: "Clean the dishes",
  description: "The dishes are really dirty",
  is_completed: true,
  user_id: 1,
  time_spent: 1.0
})

Repo.insert!(%Task{
  title: "Take out the trash",
  description: "First walk outside, then bring the trash to the trash can",
  is_completed: false,
  user_id: 1,
  time_spent: 1.25
})

Repo.insert!(%Task{
  title: "Conquer your fear of upright pianos",
  description:
    "We will conquer our fears on a grand scale. Let's start with inanimate instruments",
  is_completed: false,
  user_id: 2,
  time_spent: 0.0
})

Repo.insert!(%Task{
  title: "Try drinking water.",
  description:
    "I've noticed an increasing trend of people forgetting to drink water. In fact, I think they're forgetting to drink at all...",
  is_completed: false,
  time_spent: 0.0
})
