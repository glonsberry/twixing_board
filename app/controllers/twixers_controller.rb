class TwixersController < ApplicationController
  before_action :require_login, only: [:profile]

  
  def new
    @twixer = Twixer.new
  end

  def create
    @twixer = Twixer.new(twixer_params)
    if @twixer.save
      redirect_to login_path
    else
      render :new
    end
  end

  def profile
  end

  def twixer_params
    params.require(:twixer).permit(:email, :password)
  end
end
