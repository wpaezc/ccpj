class CreateAttachments < ActiveRecord::Migration[7.0]
  def change
    create_table :attachments do |t|
      t.string :resource_type
      t.string :resource_id
      t.string :name
      t.string :uuid
      t.string :extension
      t.string :file

      t.timestamps
    end
  end
end
