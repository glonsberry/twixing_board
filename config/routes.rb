Rails.application.routes.draw do

  root 'welcome#index'
  get '/login' => 'sessions#new', as: 'login'  
  post '/sessions' => 'sessions#create', as: 'sessions'
  delete '/logout' => 'sessions#destroy', as: 'logout'  
  
  get '/signup' => 'twixers#new', as: 'signup'
  post '/twixers' => 'twixers#create', as: 'twixers'
  
  # get '/profile' => 'twixers#profile', as: 'profile'  
  # get '/profile/:id/edit' => 'twixers#edit', as: 'edit'
  # put '/profile/:id' => 'twixers#update'


  # get '/twixingboard' =>'twixingboards#index'
  get '/twixingboards/:id/show' => 'twixingboards#show', as: 'show'
  #post '/twixingboards' => 'twixingboards#create', as: 'create'
  get '/twixingboards/:id/search' => 'twixnotes#search'
  get '/twixingboards/fetchboard' => 'twixingboards#fetchboard'

  delete '/twixingboards/:id/delete/twixnotes' => 'twixnotes#destroy'

  get '/twixingboards/:id/fetch' => 'twixingboards#fetch'

  #   resources :twixingboards do
  #     resources :twixnotes
  # end 







end

