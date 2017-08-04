class ApplicationController < ActionController::Base
  respond_to :html, :json
  protect_from_forgery with: :exception
  # def incercept
  #   if params[:usertype] === 'customer'
  #     render 'customer/form'
  #   else
  #     render 'artists/form'
  # end

end
