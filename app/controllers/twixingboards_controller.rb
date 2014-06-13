class TwixingboardsController < ApplicationController

  def index
  end

  def new

  end

  def create
    @twixingboard = Twixingboard.new
  end

  def show
  end
  
  def search


   

  end

  def results

    search_term = params[:search_term]
    
 



  end

end
