class Api::RegistrationsController < ApplicationController
  def create
    ActiveRecord::Base.transaction do
      registration = Registration.create(
        params[:general_data].permit(:tipo_de_comprobante, :ruc, :categoria).merge({state: 'ingresado', uuid: params[:form_uuid]})
      )
      attachments = Attachment.where(resource_id: params[:form_uuid]).update_all(registration_id: registration.id)
      params[:participantes].each do |data|
        registration.participants.create!(data.permit("apellido_paterno", "apellido_materno", "nombres", "document_identidad", "celular", "correo", "pais"))
      end

      render json: {registration: {uuid: registration.uuid}}
    end
  end

  def signed_urls
    render json: {
      signed_urls: Attachments.signed_urls(
        params[:resource_type],
        params[:resource_id],
        params[:files] || []
      )
    }
  end

  def attachments
    attachment = Attachments.create(
      params[:resource_type],
      params[:resource_id],
      params[:file]
    )

    render json: AttachmentSerializer.new(attachment).serialized_json
  end
end
