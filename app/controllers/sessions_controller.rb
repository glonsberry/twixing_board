class SessionsController < ApplicationController

  def new # login-form
  end

  def create # login
    twixer = login(params[:email], params[:password])

    
  if twixer
    # id = twixer.twixingboards.first.id.to_s
    # redirect_to 'twixingboards/' + id + '/show'
    redirect_to profile_path
  else
    render :new
  end
end

  def destroy # logout
    logout
    redirect_to root_path
  end

end

