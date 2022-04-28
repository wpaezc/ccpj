class RegistrationsController < ApplicationController
  def index 
  end

  def show
    @registration = Registration.find_by(uuid: params[:id])
  end
end
