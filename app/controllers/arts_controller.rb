class ArtsController < ApplicationController
  before_action :set_art, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:show, :index]
  load_and_authorize_resource

  # GET /arts
  # GET /arts.json
  def index
    @ability = Ability.new(current_user)
    # if params[:search].nil? || params[:search].empty?
      @arts = Art.all
    # else @arts = Art.basic_search(params[:search])
    #   render "/arts/index.html"
    # end
    @filterrific = initialize_filterrific(
   Art,
   params[:filterrific],
   select_options: {
        sorted_by: Art.options_for_sorted_by,
     },
     persistence_id: 'shared_key',
     default_filter_params: {},
 ) or return
  @arts = @filterrific.find.page(params[:page])


 respond_to do |format|
   format.html
   format.js
 end
 end

  end
