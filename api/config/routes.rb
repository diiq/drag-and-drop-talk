Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope '/api/v1', defaults: { format: :json } do

    post 'state', controller: :state, action: :set
    get 'state', controller: :state, action: :get
    delete 'state', controller: :state, action: :delete

    resources :actions, only: [:create, :index]
    resources :estimates, only: [:create, :update, :index]
  end
end
