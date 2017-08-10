class AdvancedSearchesController < ApplicationController
  def index
  end

  def new
    @advanced_search = AdvancedSearch.new
  end

  def create
    @advanced_search = AdvancedSearch.create!(params[:search])
    redirect_to @advanced_search
  end

  def show
    @advanced_search = AdvancedSearch.find(params[:id])
  end


  def allowed_params
    params.require(:search).permit!
  end
  
end
