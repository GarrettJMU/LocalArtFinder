Rails.application.routes.draw do

  resources :events
  resources :galleries
  resources :arts
  resources :customers
  resources :artists
  resources :admin
  resources :charges

  devise_for :users, :controllers => { registrations: "registrations", :omniauth_callbacks => "users/omniauth_callbacks"}

  devise_scope :user do
    authenticate :user do
      get 'artists/index', as: :authenticated_root
    end

    unauthenticated do
      get 'landing_page/index', as: :unauthenticated_root
    end
  end
  root 'landing_page#index'
end
