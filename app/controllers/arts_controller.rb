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
 ) or return
  @arts = @filterrific.find.page(params[:page])


 respond_to do |format|
   format.html
   format.js
 end
 end

 def new
@art = Art.new
@user = current_user
@artist = @user.artists.first.id
end

def edit
  @user = current_user
  @artist = @user.artists.first.id
end

def create
@user = current_user
@artist = @user.id
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
@art = Art.find(params[:id])
end

def art_params
params.require(:art).permit(:genre, :description, :price, :length, :width, :medium, :artist_id, :user_id, :image)
end


  end
