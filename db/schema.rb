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

ActiveRecord::Schema.define(version: 20170810220907) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "advanced_searches", force: :cascade do |t|
    t.string "keywords"
    t.string "artist_name"
    t.string "genre"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "artist_id"
    t.string "price"
    t.index ["artist_id"], name: "index_advanced_searches_on_artist_id"
  end

  create_table "artists", force: :cascade do |t|
    t.string "artist_name"
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password"
    t.string "street"
    t.string "city"
    t.string "state"
    t.string "zipcode"
    t.string "website"
    t.decimal "sales"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.string "price"
    t.index ["user_id"], name: "index_artists_on_user_id"
  end

  create_table "arts", force: :cascade do |t|
    t.string "genre"
    t.string "description"
    t.integer "price"
    t.decimal "length"
    t.decimal "width"
    t.string "medium"
    t.bigint "artist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.string "image_file_name"
    t.string "image_content_type"
    t.integer "image_file_size"
    t.datetime "image_updated_at"
    t.index ["artist_id"], name: "index_arts_on_artist_id"
    t.index ["user_id"], name: "index_arts_on_user_id"
  end

  create_table "customers", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password"
    t.string "street"
    t.string "city"
    t.string "state"
    t.string "zipcode"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_customers_on_user_id"
  end

  create_table "events", force: :cascade do |t|
    t.time "start"
    t.time "end"
    t.bigint "gallery_id"
    t.bigint "artist_id"
    t.bigint "art_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.date "date"
    t.index ["art_id"], name: "index_events_on_art_id"
    t.index ["artist_id"], name: "index_events_on_artist_id"
    t.index ["gallery_id"], name: "index_events_on_gallery_id"
    t.index ["user_id"], name: "index_events_on_user_id"
  end

  create_table "galleries", force: :cascade do |t|
    t.string "name"
    t.string "website"
    t.string "phone"
    t.time "opening"
    t.time "closing"
    t.string "street"
    t.string "city"
    t.string "state"
    t.string "zipcode"
    t.bigint "artist_id"
    t.bigint "art_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.text "description"
    t.index ["art_id"], name: "index_galleries_on_art_id"
    t.index ["artist_id"], name: "index_galleries_on_artist_id"
    t.index ["user_id"], name: "index_galleries_on_user_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "resource_type"
    t.bigint "resource_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["name"], name: "index_roles_on_name"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource_type_and_resource_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "provider"
    t.string "uid"
    t.string "name"
    t.text "image"
    t.string "password_reset_token"
    t.datetime "password_reset_sent_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "role_id"
    t.index ["role_id"], name: "index_users_roles_on_role_id"
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id"
    t.index ["user_id"], name: "index_users_roles_on_user_id"
  end

  add_foreign_key "advanced_searches", "artists"
  add_foreign_key "artists", "users"
  add_foreign_key "arts", "artists"
  add_foreign_key "arts", "users"
  add_foreign_key "customers", "users"
  add_foreign_key "events", "artists"
  add_foreign_key "events", "arts"
  add_foreign_key "events", "galleries"
  add_foreign_key "events", "users"
  add_foreign_key "galleries", "artists"
  add_foreign_key "galleries", "arts"
  add_foreign_key "galleries", "users"
end
