# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

State.first_or_create() do |s|
  s.update(name: "waiting")
end

Task.where(id: "446ed2be-6665-44ae-b48c-de41695acbb6").first_or_initialize.update(name: "Mic check", description: nil)
Task.where(id: "fcbea0fa-7951-40aa-8e5f-33344d71f4c4").first_or_initialize.update(name: "Are you a financial stakeholder?", description: nil)
Task.where(id: "0b1d2ffd-3ae0-418b-8d29-b6d8ffbc61c3").first_or_initialize.update(name: "Are you a product person??", description: nil)
Task.where(id: "28cca7c7-73f4-4cf9-b345-9c043e410e95").first_or_initialize.update(name: "Are you a project manager?", description: nil)
Task.where(id: "dcedf0ce-a5e5-4e45-8314-ce64b353e562").first_or_initialize.update(name: "Are you a designer?", description: nil)
Task.where(id: "ed9220ed-075a-405e-9663-2de65cc29347").first_or_initialize.update(name: "Are you an engineer?", description: nil)
Task.where(id: "3b2deed2-6b16-467c-8827-a05c821b9891").first_or_initialize.update(name: "Type three sentences on your phone", description: nil)
Task.where(id: "8fc07b24-14d4-45d1-a084-147e6b2d3719").first_or_initialize.update(name: "Type three sentences on your phone (for real)", description: nil)
