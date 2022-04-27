Rails.application.routes.draw do
  root "registrations#index"

  namespace :api do
    resources :registrations, only: [:create] do
      collection do
        get '/signed_urls', to: 'registrations#signed_urls'
      end
    end
  end
end
