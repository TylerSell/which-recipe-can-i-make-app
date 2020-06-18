Rails.application.routes.draw do
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/get_current_user', to: 'sessions#get_current_user'
  
  resources :users, only: [:create, :show, :update] do 
    resources :recipes do 
      resources :instructions, only: [:index, :create, :update]
      resources :ingredients, only: [:index, :create, :update]
    end
    resources :pantry_items, only: [:index, :create, :destroy]
  end




  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
