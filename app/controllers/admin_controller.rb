class AdminController < ApplicationController
  def index
    @users = User.all
  end

  def update
    user = User.find(params[:id])
    user.remove_role user.roles.last # user only has one role
    user.add_role(:artist)
    redirect_to '/admin'
  end

  private

  def authorize
    if !current_user.has_role? :admin
      render plain:"I pitty the fool that try to access this page!"
    end
  end
end
