Rails.application.routes.draw do
  get 'admin/index'

  get 'admin/update'

  get 'usertypes/index'

  get 'usertypes/route'
  get "admin" => "admin#index"
  put "admin/:id" => "admin#update"
  patch "admin/:id" => "admin#update"

  resources :events
  resources :galleries
  resources :arts
  resources :customers
  resources :artists


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
