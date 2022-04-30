ActiveAdmin.register Participant do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :apellido_paterno, :apellido_materno, :nombres, :document_identidad, :celular, :correo, :pais, :registration_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:apellido_paterno, :apellido_materno, :nombres, :document_identidad, :celular, :correo, :pais, :registration_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  
  index do
    selectable_column
    column :apellido_paterno
    column :apellido_materno
    column :nombres
    column :document_identidad
    column :celular
    column :correo
    column :pais
    column :registration do |person|
      link_to "Link publico", "/registrations/#{person.registration.uuid}"
    end
  end



end
