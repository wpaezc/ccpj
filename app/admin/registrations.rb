ActiveAdmin.register Registration do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :tipo_de_comprobante, :ruc, :tipo_de_inscripcion, :categoria, :uuid
  #
  # or
  #
  # permit_params do
  #   permitted = [:tipo_de_comprobante, :ruc, :tipo_de_inscripcion, :categoria, :uuid]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  

  index do
    selectable_column
    column :tipo_de_comprobante
    column :categoria
    column :ruc
    column :created_at do |registration|
      registration.created_at.in_time_zone("Lima")
    end


    column :uuid,  :sortable => :name do |registration|
      link_to "Link publico", "/registrations/#{registration.uuid}"

    end
    
     actions :defaults => true

  end


end
