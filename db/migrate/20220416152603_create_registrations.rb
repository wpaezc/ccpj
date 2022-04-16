class CreateRegistrations < ActiveRecord::Migration[7.0]
  def change
    create_table :registrations do |t|
      t.string :tipo_de_comprobante
      t.string :ruc
      t.string :tipo_de_inscripcion
      t.string :categoria

      t.timestamps
    end
  end
end
