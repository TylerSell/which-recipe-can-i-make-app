Rails.application.routes.draw do
  
  
  
  resources :users do 
    resources :recipes
    resources :pantry_items
    resources :instructions
    resources :ingredients
  end




  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
