Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/property/:id'       => 'static_pages#property'
  get '/login'              => 'static_pages#login'
  get '/createProperty'     => 'static_pages#createProperty'
  get '/editProperty/:id'   => 'static_pages#editProperty'
  get '/user/:id'           => 'static_pages#account'
  get '/user/:id/accountProperties' => 'static_pages#accountProperties'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show, :create, :indexAccount]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]

    # properties
    get '/properties/:id/bookings'  => 'bookings#get_property_bookings'
    post '/createProperty'          => 'properties#create'
    get '/editProperty/:id'         => 'properties#get_property'
    put '/editProperty/:id'         => 'properties#edit'
    get '/user/:id/accountProperties' => 'properties#getUserProperties'

    # sessions
    get '/authenticated'            => 'sessions#authenticated'
    delete '/sessions'              => 'sessions#destroy'

    # bookings


    # users
  #  get '/user/:id'                => 'users#getUserData'

    # stripe webhook
    post '/charges/mark_complete'  => 'charges#mark_complete'

  end
end
