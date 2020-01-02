Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'toppage#index'
  resources :users, only: [:index, :edit, :update, :show]
  resources :tweets, only: [:index ,:new ,:create,:show] do
    resources :comments ,only: [:create]
  end
  resources :groups, only: [:index, :new, :create, :edit, :update]do
    resources :messages, only: [:index, :create]

    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end
