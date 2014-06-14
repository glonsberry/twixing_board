class TwixingboardsController < ApplicationController
  before_action :require_login
  def index
    
  end

  def new

  end

  def create
    twixingboard = Twixingboard.create(twixingboard_params)
    current_user.twixingboards << twixingboard

    redirect_to "/twixingboards/#{ twixingboard.id }"
  end

  def show
     @twixingboard = Twixingboard.find(params[:id])
     @frequency = 0
      unless params[:search_term].nil? 
        search_term = params[:search_term]
        @results = @twixingboard.find_frequency(search_term)
      end

  end
  
  def search

  def edit
      @twixingboard = Twixingboard.find(params[:id])
      @current_twixing_board = current_user.twixingboards.name
  end


  end

  def results

    
  end

  private
    def twixingboard_params
      twixingboard_params = params.require(:twixingboard).permit(:name, :id)
    end

end


