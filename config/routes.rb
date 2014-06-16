Rails.application.routes.draw do

  get '/login' => 'sessions#new', as: 'login'  
  post '/sessions' => 'sessions#create', as: 'sessions'
  delete '/logout' => 'sessions#destroy', as: 'logout'  
  
  get '/signup' => 'twixers#new', as: 'signup'
  post '/twixers' => 'twixers#create', as: 'twixers'
  
  get '/profile' => 'twixers#profile', as: 'profile'  
  get '/profile/:id/edit' => 'twixers#edit', as: 'edit'
  put '/profile/:id' => 'twixers#update'
  root 'welcome#index'

  get '/twixingboard' =>'twixingboards#index'
  get '/twixingboards/:id/show' => 'twixingboards#show', as: 'show'

  get '/twixingboards/:id/search' => 'twixnotes#search'

  delete '/twixingboards/:id/delete/twixnotes' => 'twixnotes#destroy'

  get '/twixingboards/:id/fetch' => 'twixingboards#fetch'

    resources :twixingboards do
      resources :twixnotes
  end 

end

