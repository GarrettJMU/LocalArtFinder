class GalleriesController < ApplicationController
  before_action :authenticate_user!, except: [:show, :index]
  before_action :set_gallery, only: [:show, :edit, :update, :destroy]
  load_and_authorize_resource

  # GET /galleries
  # GET /galleries.json
  def index
    @ability = Ability.new(current_user)
    # if params[:search].nil? || params[:search].empty?
      @galleries = Gallery.all
    # else @galleries = Gallery.basic_search(params[:search])
      # render "/galleries/index.html"
    # end
  end

  # GET /galleries/1
  # GET /galleries/1.json
  def show
  end

  # GET /galleries/new
  def new
    @user = current_user
    @gallery = Gallery.new
  end

  # GET /galleries/1/edit
  def edit
    @user = current_user
  end

  # POST /galleries
  # POST /galleries.json
  def create
    @user = current_user
    @gallery = Gallery.new(gallery_params)

    respond_to do |format|
      if @gallery.save
        format.html { redirect_to @gallery, notice: 'Gallery was successfully created.' }
        format.json { render :show, status: :created, location: @gallery }
      else
        format.html { render :new }
        format.json { render json: @gallery.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /galleries/1
  # PATCH/PUT /galleries/1.json
  def update
    @user = current_user
    respond_to do |format|
      if @gallery.update(gallery_params)
        format.html { redirect_to @gallery, notice: 'Gallery was successfully updated.' }
        format.json { render :show, status: :ok, location: @gallery }
      else
        format.html { render :edit }
        format.json { render json: @gallery.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /galleries/1
  # DELETE /galleries/1.json
  def destroy
    @user = current_user
    @gallery.destroy
    respond_to do |format|
      format.html { redirect_to galleries_url, notice: 'Gallery was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_gallery
      @gallery = Gallery.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.

    def filtering_params
      params.require(:gallery).permit(:name, :website, :phone, :opening, :closing, :street, :city, :state, :zipcode, :artist_id, :art_id, :user_id)
    end

    def gallery_params
      params.require(:gallery).permit(:name, :description, :website, :phone, :opening, :closing, :street, :city, :state, :zipcode, :artist_id, :art_id, :user_id)
    end
end
