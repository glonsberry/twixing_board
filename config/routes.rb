Rails.application.routes.draw do

  get '/login' => 'sessions#new', as: 'login'  
  post '/sessions' => 'sessions#create', as: 'sessions'
  delete '/logout' => 'sessions#destroy', as: 'logout'  
  
  get 'signup' => 'twixers#new', as: 'signup'
  post 'twixers' => 'twixers#create', as: 'twixers'
  
  get '/profile' => 'twixers#profile', as: 'profile'  
  
  root 'welcome#index'
end

