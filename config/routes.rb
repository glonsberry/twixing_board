Rails.application.routes.draw do

  root 'sessions#new'
  get '/login' => 'sessions#new', as: 'login'
  post '/sessions' => 'sessions#create', as: 'sessions'
  delete '/logout' => 'sessions#destroy', as: 'logout'

  get '/signup' => 'twixers#new', as: 'signup'
  post '/twixers' => 'twixers#create', as: 'twixers'

  get '/twixingboards/:id/search' => 'twixnotes#search'
  get '/twixingboards/fetchboard' => 'twixingboards#fetchboard'

  delete '/twixingboards/:id/delete/twixnotes' => 'twixnotes#destroy'

  get '/twixingboards/:id/fetch' => 'twixingboards#fetch'
  get '/twixingboards/myboard' => 'twixingboards#myboard'

end
