# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 5) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"


  create_table "states", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "text"
    t.string "task_id"
  end

  create_table "people", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string "emoji"
    t.index ["id"], name: "index_id_on_people", unique: true, using: :btree
  end

  create_table "estimates", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string "type"
    t.float "mode"
    t.float "extreme"
    t.string "rationale"
    t.string "task_id"
    t.uuid "person_id"
    t.index ["id"], name: "index_id_on_estimates", unique: true, using: :btree
    t.index ["task_id"], name: "index_task_id_on_estimates", using: :btree
  end

  create_table "actions", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.float "actual_time"
    t.string "task_id"
    t.uuid "person_id"
    t.index ["id"], name: "index_id_on_actions", unique: true, using: :btree
    t.index ["task_id"], name: "index_task_id_on_actions", using: :btree
  end
end
