class CreateParticipants < ActiveRecord::Migration[7.0]
  def change
    create_table :participants do |t|
      t.string :apellido_paterno
      t.string :apellido_materno
      t.string :nombres
      t.string :document_identidad
      t.string :celular
      t.string :correo
      t.string :pais
      t.integer :registration_id

      t.timestamps
    end
  end
end
