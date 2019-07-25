Rails.application.routes.draw do
  root 'pages#index'

  namespace :api, defaults: { format: 'json' } do
    get 'leagues', to: 'leagues#index'

    get '/teams', to: 'teams#index'
    get '/teams/:id/', to: 'teams#show'

    # ONLY ENABLE THIS GET ENDPOINT FOR DEBUGGING
    # get 'users', to: 'users#index'
    post 'users', to: 'users#create'
  end

  controller :sessions do
    post 'login' => :create
    delete 'logout' => :destroy
  end

  match '*path', to: 'pages#index', via: :all
end
