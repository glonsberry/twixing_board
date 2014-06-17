class TwixingboardsController < ApplicationController
  before_action :require_login

  
  def index
  end

  def new
  end

  def create
    if current_user.twixingboards.count == 0 
      twixingboard = Twixingboard.create(twixingboard_params)
      current_user.twixingboards << twixingboard
    end
    twixingboard = current_user.twixingboards.first

    redirect_to "/twixingboards/#{ twixingboard.id }"
  end

  def fetchboard
     if current_user.twixingboards.count == 0
      Twixingboard.create(name: "Twixingboard", twixer_id: current_user.id)
    end
    # @twixingboard = current_user.twixingboards.first
     # @my_board = current_user.twixingboards.first
     redirect_to "/twixingboards/myboard"
     #redirect_to "/twixingboards/#{ @twixingboard.id }/show"
  end

  def myboard
    @twixingboard = current_user.twixingboards.first
  end

  
  def fetch
    twixnotesArr = []
    twixingboard = Twixingboard.find(params[:id])
    twixnotesArr = twixingboard.twixnotes.take(10)

    respond_to do |format|
      format.json {render :json => twixnotesArr}
    end    
  end

  # def edit
  #     @twixingboard = Twixingboard.find(params[:id])
  # end

  # def update
  #   twixingboard = Twixingboard.find(params[:id])
  #   twixingboard.update(twixingboard_params)
  #   redirect_to "/profile/#{ twixer.id }"
  # end

  private
    def twixingboard_params
      twixingboard_params = params.require(:twixingboard).permit(:name, :id)
    end

end


