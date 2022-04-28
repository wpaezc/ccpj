class RegistrationsController < ApplicationController
  def index 
  end

  def show
    @registration = Registration.find_by(uuid: params[:id])
    if @registration
      qr = RQRCode::QRCode.new(request.url)
      @svg = qr.as_svg(
        color: "000",
        shape_rendering: "crispEdges",
        module_size: 4,
        standalone: true,
        use_path: true
      )
    else
      redirect_to root_path
    end
  end
end
