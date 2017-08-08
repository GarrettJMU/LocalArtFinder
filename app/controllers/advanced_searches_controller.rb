class AdvancedSearchesController < ApplicationController
  def new
    @advanced_search = AdvancedSearch.new
  end

  def create
    @advanced_search = AdvancedSearch.create(advanced_search_params)
    redirect_to @advanced_search
  end

  def show
    @advanced_search = AdvancedSearch.find(params[:id])
  end

  private

  def advanced_search_params
    params.require(:advanced_search).permit(:keywords, :genre, :alias)
  end
end
