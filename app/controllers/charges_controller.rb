class ChargesController < ApplicationController


def new
end

def create
  customer = Stripe::Customer.create(
    :email => params[:stripeEmail],
    :source  => params[:stripeToken]
  )

  charge = Stripe::Charge.create(
    :customer    => customer.id,
    :amount      => cookies[:sale],
    :description => 'Rails Stripe customer',
    :currency    => 'usd',
    :key         => Rails.application.secrets.stripe_publishable_key
  )
  redirect_to controller: 'arts', action: 'show', id: cookies[:art]
  flash[:notice] = "Your payment was successfully submitted." 
  # redirect_to arts_url, id:@art , :flash => { :notice => "Your payment was successfully submitted." }
rescue Stripe::CardError => e
  flash[:error] = e.message
  redirect_to new_charge_path
end

private

def charges_params
  params.require(:art).permit(:id)
end
end
