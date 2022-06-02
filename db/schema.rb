# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_06_01_044240) do

  create_table "bookings", force: :cascade do |t|
    t.date "start_date"
    t.date "end_date"
    t.integer "user_id"
    t.integer "property_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["property_id"], name: "index_bookings_on_property_id"
    t.index ["user_id"], name: "index_bookings_on_user_id"
  end

  create_table "charges", force: :cascade do |t|
    t.string "checkout_session_id"
    t.string "currency"
    t.decimal "amount", precision: 10, scale: 2
    t.boolean "complete", default: false
    t.integer "booking_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["booking_id"], name: "index_charges_on_booking_id"
  end

  create_table "properties", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.string "city"
    t.string "country"
    t.string "property_type"
    t.integer "price_per_night"
    t.integer "max_guests"
    t.integer "bedrooms"
    t.integer "beds"
    t.integer "baths"
    t.string "image_url"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_properties_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.string "token"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "bookings", "properties"
  add_foreign_key "bookings", "users"
  add_foreign_key "charges", "bookings"
  add_foreign_key "properties", "users"
  add_foreign_key "sessions", "users"
end
