class AddStateToRegistration < ActiveRecord::Migration[7.0]
  def change
    add_column :registrations, :state, :string

    Registration.update_all(state: 'ingresado')
  end
end
