class TwixnotesController < ApplicationController

  def index
  end

  def create
    new_twixnote = Twixnote.create(twixnote_params)
    respond_to do |format|
      format.json { render :json =>new_twixnote }
      format.html { redirect_to show_path }
    end
    twixingboard = Twixingboard.find(params[:twixingboard_id])
    twixingboard.twixnotes << new_twixnote
    
  end

  def destroy

    Twixnote.delete(params[:id])
    

  end

  def search
    twixnote = Twixnote.new
    twixnote.name = params[:search_term]
    twixnote.frequency = twixnote.find_frequency(twixnote.name)
    twixnote.save()

    respond_to do |format|
      format.json { render :json => twixnote }
    end
  end







private
  def twixnote_params
    params.require(:twixnote).permit(:name, :frequency)
  end
end