class Api::RegistrationsController < ApplicationController
  def signed_urls
    render json: {
      signed_urls: Registrations.signed_urls(
        params[:resource_type],
        params[:resource_id],
        params[:files] || []
      )
    }
  end
end
