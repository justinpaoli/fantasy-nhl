Rails.application.routes.draw do
  root 'pages#index'

  namespace :api, defaults: { format: 'json' } do
    get '/leagues', to: 'leagues#index'
    post '/leagues', to: 'leagues#create'

    get '/teams', to: 'teams#index'
    get '/teams/:id/', to: 'teams#show'

    get '/seasons/current', to: 'seasons#current'

    # ONLY ENABLE THIS GET ENDPOINT FOR DEBUGGING
    # get 'users', to: 'users#index'
    post '/users', to: 'users#create'
  end

  controller :sessions do
    post 'login' => :create
    delete 'logout' => :destroy
  end

  match '*path', to: 'pages#index', via: :all
end
