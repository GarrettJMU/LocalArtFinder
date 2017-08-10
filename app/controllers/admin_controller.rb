class AdminController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize
  load_and_authorize_resource


  def index
    @users = User.all
    @ability = Ability.new(current_user)
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
