class ArtSearchesController < ApplicationController
  def index
  end

  def new
    @ArtSearch = ArtSearch.new
  end

  def create
    @ArtSearch = ArtSearch.create!(params[:medium])
    redirect_to @ArtSearch
  end

  def show
    @ArtSearch = ArtSearch.find(params[:id])
  end

end
