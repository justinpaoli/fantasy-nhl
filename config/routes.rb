Rails.application.routes.draw do
  resources :users
  root 'pages#index'

  namespace :api, defaults: { format: 'json' } do
    get '/teams', to: 'teams#index'
    get '/team/:id/', to: 'teams#team'
  end

  controller :sessions do
    post 'login' => :create
    delete 'logout' => :destroy
  end

  match '*path', to: 'pages#index', via: :all
end
