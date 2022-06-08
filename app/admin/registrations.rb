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
  
  scope("Nuevos ingresos", default: true) { |scope| scope.where(state: 'ingresado') }
  scope("Archivados") { |scope| scope.where(state: 'archivado') }

  index do
    selectable_column
    column :tipo_de_comprobante
    column :categoria
    column :ruc
    column :state do |registration|
      registration.state&.upcase
    end

    column :created_at do |registration|
      registration.created_at.in_time_zone("Lima")
    end


    column :uuid,  :sortable => :name do |registration|
      link_to "Link publico", "/registrations/#{registration.uuid}"

    end
    
    actions defaults: true do |registration|
      label = registration.state == 'ingresado' ? 'Archivar' : "Desarchivar"
      link_to label, "/admin/registrations/#{registration.id}/change_state", :method => :post, :class => "member_link"
    end
  end


  member_action :change_state, method: :post do
    registration = Registration.find(params[:id])

    if registration.state == 'ingresado'
      registration.update(state: 'archivado')
      flash[:notice] = "Elemento archivado"
      redirect_to "/admin/registrations"
    else
      flash[:notice] = "Elemento desarchivado"
      redirect_to "/admin/registrations?scope=archivados"
      registration.update(state: 'ingresado')
    end
  end

end
