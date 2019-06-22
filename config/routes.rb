Rails.application.routes.draw do
  root 'pages#index'

  namespace :api, defaults: { format: 'json' } do
    get '/teams', to: 'teams#index'
  end

  match '*path', to: 'pages#index', via: :all
end
