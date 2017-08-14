class ArtistsController < ApplicationController
  before_action :authenticate_user!, except: [:show, :index]
  before_action :set_artist, only: [:show, :edit, :update, :destroy]
  load_and_authorize_resource



  # GET /artists
  # GET /artists.json
  def index
    @ability = Ability.new(current_user)
    if params[:direction] == "asc"
      @artists = Artist.filter(params.slice(:artist_name, :price)).order("artist_name asc")
    elsif params[:direction] == "desc"
      @artists = Artist.filter(params.slice(:artist_name, :price)).order("artist_name desc")
    else
    @artists = Artist.filter(params.slice(:artist_name, :price))
  end


 #    @filterrific = initialize_filterrific(
 #   Artist,
 #   params[:filterrific],
 #   select_options: {
 #        sorted_by: Artist.options_for_sorted_by,
 #     },
 #     persistence_id: 'shared_key',
 #     default_filter_params: {},
 # ) or return
 #  @artists = @filterrific.find.page(params[:page])
 #
 #  respond_to do |format|
 #    format.html
 #    format.js
  end




  # GET /artists/1
  # GET /artists/1.json
  def show
    @arts = Artist.find(params[:id]).arts.all
    @events = Artist.find(params[:id]).events.all
  end


  # GET /artists/new
  def new
    @artist = Artist.new
    @user = current_user
    # @artist = current_user.Artist.build
  end

  # GET /artists/1/edit
  def edit
    @user = current_user
  end

  # POST /artists
  # POST /artists.json
  def create
    @user = current_user
    # @artist = current_user.artists.build(artist_params)
    @artist = Artist.new(artist_params)
    respond_to do |format|
      if @artist.save
        format.html { redirect_to @artist, notice: 'Artist was successfully created.' }
        format.json { render :show, status: :created, location: @artist }
      else
        format.html { render :new }
        format.json { render json: @artist.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /artists/1
  # PATCH/PUT /artists/1.json
  def update
    @user = current_user
    respond_to do |format|
      if @artist.update(artist_params)
        format.html { redirect_to @artist, notice: 'Artist was successfully updated.' }
        format.json { render :show, status: :ok, location: @artist }
      else
        format.html { render :edit }
        format.json { render json: @artist.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /artists/1
  # DELETE /artists/1.json
  def destroy
    @user = current_user
    @artist.destroy
    respond_to do |format|
      format.html { redirect_to artists_url, notice: 'Artist was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def sort_column
   Artist.column_names.include?(params[:sort]) ? params[:sort] : "name"
 end

 def sort_direction
   %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
 end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_artist
      @user = current_user
      @artist = Artist.find(params[:id])
    end

    def filtering_params
      params.require(:artist).permit(:artist_name, :price)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def artist_params

      params.require(:artist).permit(:artist_name, :first_name, :last_name, :email, :password, :street, :city, :state, :zipcode, :website, :sales, :phone, :user_id, :price, :direction)

    end
end
