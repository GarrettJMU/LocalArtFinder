class SearchController < ApplicationController


  def index
      @search = params[:search]
      @artists = Artist.basic_search(params[:search])
      @arts = Art.basic_search(params[:search])
      @galleries = Gallery.basic_search(params[:search])
      @events = Event.basic_search(params[:search])
      render "/search/index.html"
  end
end
