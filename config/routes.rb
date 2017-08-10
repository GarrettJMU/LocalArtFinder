Rails.application.routes.draw do
  get 'faq/index'

  get 'password_resets/new'

  get '/search' => 'search#index'
  # resources :events
  resources :galleries
  resources :arts
  resources :customers
  resources :artists
  resources :admin
  resources :charges
  resources :password_resets
  resources :faq


  get '/about/index'

  devise_for :users, :controllers => { registrations: "registrations", :omniauth_callbacks => "users/omniauth_callbacks"}

  devise_scope :user do
    authenticate :user do
      get 'artists/index', as: :authenticated_root
    end

    unauthenticated do
      get 'landing_page/index', as: :unauthenticated_root
    end
  end

  resources :events do
    get :get_cal, on: :collection
  end

  root 'landing_page#index'
end
