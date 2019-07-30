Rails.application.routes.draw do
  root 'pages#index'

  namespace :api, defaults: { format: 'json' } do
    get '/leagues', to: 'leagues#index'
    get '/leagues/:id', to: 'leagues#show'
    post '/leagues', to: 'leagues#create'

    get '/player_teams', to: 'player_teams#index'
    post '/player_teams', to: 'player_teams#create'

    get '/teams', to: 'teams#index'
    get '/teams/:id', to: 'teams#show'

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
