Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  root "registrations#index"

  resources :registrations, only: [:show]

  namespace :api do
    resources :registrations, only: [:create] do
      collection do
        get '/signed_urls', to: 'registrations#signed_urls'
        post '/attachments', to: 'registrations#attachments'
      end
    end
  end
end
