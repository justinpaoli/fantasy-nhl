Rails.application.routes.draw do
  root 'pages#index'
  mount ActionCable.server => '/cable'

  namespace :api, defaults: { format: 'json' } do
    controller :leagues do
      get 'leagues' => :index
      get 'leagues/:id' => :show
      get 'leagues/:id/teams' => :teams
      post 'leagues' => :create
    end

    controller :player_teams do
      get 'player_teams' => :index
      get 'player_teams/:id' => :show
      post 'player_teams' => :create
      put 'player_teams/:id' => :update
    end

    controller :teams do
      get 'teams' => :index
      get 'teams/:id' => :show
    end

    controller :seasons do
      get 'seasons/current' => :current
    end

    controller :users do
      # ONLY ENABLE THIS GET ENDPOINT FOR DEBUGGING
      # get 'users' => :index
      post 'users' => :create
    end
  end

  post 'login' => 'user_token#create'

  match '*path', to: 'pages#index', via: :all
end
