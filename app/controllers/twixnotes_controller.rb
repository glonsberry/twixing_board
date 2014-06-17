class TwixnotesController < ApplicationController
before_action :require_login
  def index
  end

  # def create
  #   new_twixnote = Twixnote.create(twixnote_params)
  #   respond_to do |format|
  #     format.json { render :json =>new_twixnote }
  #     format.html { redirect_to show_path }
  #   end
  #   twixingboard = Twixingboard.find(params[:id])
  #   twixingboard.twixnotes << new_twixnote
    
  # end

  def destroy
    delete_id = params[:twixnote][:id]
    Twixnote.delete(delete_id)

    respond_to do |format|
      format.json { render :json =>{ deleted: delete_id } } 
    end
  end

  def search
    new_twixnote = Twixnote.new
    binding.pry
    new_twixnote = Twixnote.create(new_twixnote.get_twixnote(params[:search_term]))
    twixingboard = Twixingboard.find(params[:id])
    twixingboard.twixnotes << new_twixnote

    respond_to do |format|
      format.json { render :json => new_twixnote }
    end
  end

private
  def twixnote_params
    params.require(:twixnote).permit(:name, :frequency, :mood)
  end
end