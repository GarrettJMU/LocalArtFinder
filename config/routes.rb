Rails.application.routes.draw do


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
      root 'galleries#index', as: :authenticated_root
    end

    unauthenticated do
      root 'devise/sessions#new', as: :unauthenticated_root
    end
  end
end
