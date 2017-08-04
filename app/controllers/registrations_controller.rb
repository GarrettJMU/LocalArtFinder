class RegistrationsController < Devise::RegistrationsController
  protected

  def after_sign_up_path_for(artist)
    new_artist_path
  end

end
