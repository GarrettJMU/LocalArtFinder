class UsermailerMailer < ApplicationMailer
  default from: "localartfinder@gmail.com"

  def password_reset(user)
    @user = user
    mail :to => user.email, :subject => "Password Reset"
  end
end
