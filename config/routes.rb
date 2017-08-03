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
    authenticate :user do
      root 'artists#edit', as: :authenticated_root
    end

    unauthenticated do
      root 'customers#index', as: :unauthenticated_root
    end
  end
end
