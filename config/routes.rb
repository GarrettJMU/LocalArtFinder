Rails.application.routes.draw do

  root 'landing_page#index'

  get 'usertypes/index'
  get 'usertypes/route'
  resources :events
  resources :galleries
  resources :arts
  resources :customers
  resources :artists
  resources :admin
  resources :charges



  devise_for :users

  devise_scope :user do
    authenticated :user do
      get 'galleries/index', as: :authenticated_root
    end

    unauthenticated do
      get 'devise/sessions/new', as: :unauthenticated_root
    end
  end
end
