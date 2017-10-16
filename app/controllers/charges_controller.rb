class ChargesController < ApplicationController
before_action :set_art, only: [:show, :edit, :update, :destroy]

def new
end

def create
  # @amount = @art.price
  # @url = request.original_url.to_s
  # @url.split("/")
  # @art = Art.find(@url[2])
  customer = Stripe::Customer.create(
    :email => params[:stripeEmail],
    :source  => params[:stripeToken]
  )

  charge = Stripe::Charge.create(
    :customer    => customer.id,
    :amount      => @art.price * 100,
    :description => 'Rails Stripe customer',
    :currency    => 'usd',
    :key         => Rails.application.secrets.stripe_publishable_key
  )

rescue Stripe::CardError => e
  flash[:error] = e.message
  redirect_to new_charge_path
end

private

# maybe not needed ///////////
def set_art
@art = Art.find(params[:id])
end


def charges_params
  params.require(:art).permit(:id)
end
end
