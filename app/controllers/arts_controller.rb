class ArtsController < ApplicationController
  before_action :set_art, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:show, :index]
  # load_and_authorize_resource

  # GET /arts
  # GET /arts.json
  def index
    @ability = Ability.new(current_user)
    if params[:search].nil? || params[:search].empty?
      @arts = Art.all
      @results = Art.basic_search(params[:search])
    else @arts = Art.basic_search(params[:search])
      redirect_to "/arts/#{@results.first.id}"
    end

  end

  # GET /arts/1
  # GET /arts/1.json
  def show
  end

  # GET /arts/new
  def new
    @art = Art.new
    @user = current_user
    @artist = @user.artists.first.id
  end

  # GET /arts/1/edit
  def edit
  end

  # POST /arts
  # POST /arts.json
  def create
    @user = current_user
    @artist = @user.artists.first.id
    @art = Art.new(art_params)
    respond_to do |format|
      if @art.save
        format.html { redirect_to @art, notice: 'Art was successfully created.' }
        format.json { render :show, status: :created, location: @art }
      else
        format.html { render :new }
        format.json { render json: @art.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /arts/1
  # PATCH/PUT /arts/1.json
  def update
    @user = current_user
    @artist = @user.artists.first.id
    respond_to do |format|
      if @art.update(art_params)
        format.html { redirect_to @art, notice: 'Art was successfully updated.' }
        format.json { render :show, status: :ok, location: @art }
      else
        format.html { render :edit }
        format.json { render json: @art.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /arts/1
  # DELETE /arts/1.json
  def destroy
    @user = current_user
    @artist = @user.artists.first.id
    @art.destroy
    respond_to do |format|
      format.html { redirect_to arts_url, notice: 'Art was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def charges
    redirect_to "charges/new"
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_art
      @user = current_user
      @artist = @user.artists.first.id
      @art = Art.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def art_params
      params.require(:art).permit(:genre, :description, :price, :length, :width, :medium, :artist_id, :user_id, :image)
    end
end
