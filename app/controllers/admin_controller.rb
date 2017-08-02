class AdminController < ApplicationController
  def index
    @users = User.all
  end

  def update
    user = User.find(params[:id])
    if !current_user.has_role? :admin
       user.remove_role(:admin)
     end
     if !current_user.has_role? :customer
       user.remove_role(:customer)
     end

    user.add_role(:artist)
    redirect_to '/admin'
  end

  private

  def authorize
    if !current_user.has_role? :admin
      render plain:"I pity the fool that try to access this page!"
    end
  end
end
