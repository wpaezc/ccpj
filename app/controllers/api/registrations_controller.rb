class Api::RegistrationsController < ApplicationController
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
