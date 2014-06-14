class TwixnotesController < ApplicationController

  def index
  end

  def create
    new_twixnote = Twixnote.create(twixnote_params)
    respond_to do |format|
      format.json { render :json =>new_twixnote }
      format.html { redirect_to show_path }
    end
    
  end






private
  def twixnote_params
    params.require(:twixnote).permit(:name, :frequency)
  end
end