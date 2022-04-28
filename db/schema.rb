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

ActiveRecord::Schema[7.0].define(version: 2022_04_28_023457) do
  create_table "attachments", force: :cascade do |t|
    t.string "resource_type"
    t.string "resource_id"
    t.string "name"
    t.string "uuid"
    t.string "extension"
    t.string "file"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "participants", force: :cascade do |t|
    t.string "apellido_paterno"
    t.string "apellido_materno"
    t.string "nombres"
    t.string "document_identidad"
    t.string "celular"
    t.string "correo"
    t.string "pais"
    t.integer "registration_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "registrations", force: :cascade do |t|
    t.string "tipo_de_comprobante"
    t.string "ruc"
    t.string "tipo_de_inscripcion"
    t.string "categoria"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
