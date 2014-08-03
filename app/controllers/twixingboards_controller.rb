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
     redirect_to "/twixingboards/myboard"
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

  private
    def twixingboard_params
      twixingboard_params = params.require(:twixingboard).permit(:name, :id)
    end

end
