class UsertypesController < ApplicationController
  def index
  end

  def route
    if params[:usertypes] == 'Customer'
      redirect_to '/customers/new'
    else
      redirect_to '/artists/new'
    end
  end
end
