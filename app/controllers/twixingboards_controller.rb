class TwixingboardsController < ApplicationController
  before_action :require_login
  
  def index
    
    
  end

  def new
    @twixingboard = Twixingboard.new
  end

  def create
    twixingboard = Twixingboard.create(twixingboard_params)
    current_user.twixingboards << twixingboard

    redirect_to "/twixingboards/#{ twixingboard.id }"
  end

  def show
     @twixingboard = Twixingboard.find(params[:id])
  end
  
  def search

  end

   def fetch
    twixnotesArr = []
    twixingboard = Twixingboard.find(params[:id])
    twixnotesArr = twixingboard.twixnotes

    respond_to do |format|
      format.json {render :json => twixnotesArr}
    end    
  end

  def edit
      @twixingboard = Twixingboard.find(params[:id])
  end

  def update
    twixingboard = Twixingboard.find(params[:id])
    twixingboard.update(twixingboard_params)
    redirect_to "/profile/#{ twixer.id }"
  end




  def results

    
  end

  private
    def twixingboard_params
      twixingboard_params = params.require(:twixingboard).permit(:name, :id)
    end

end


