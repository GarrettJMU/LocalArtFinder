class EventsController < ApplicationController
  before_action :authenticate_user!, except: [:show, :index, :get_cal]
  before_action :set_event, only: [:show, :edit, :update, :destroy]
  skip_load_and_authorize_resource

  # GET /events
  # GET /events.json
  def index
    @ability = Ability.new(current_user)
    # if params[:search].nil? || params[:search].empty?
    @events = Event.all
    # else @events = Event.basic_search(params[:search])
    #   render "/events/index.html"
    # end

  end

  # GET /events/1
  # GET /events/1.json
  def show
  end

  # GET /events/new
  def new
    @event = Event.new
    @user = current_user
  end

  # GET /events/1/edit
  def edit
    @user = current_user
  end

  # POST /events
  # POST /events.json
  def create
    @user = current_user
    @event = Event.new(event_params)
    # @gallery = @event.gallery.first.address

    respond_to do |format|
      if @event.save
        format.html { redirect_to @event, notice: 'Event was successfully created.' }
        format.json { render :show, status: :created, location: @event }
      else
        format.html { render :new }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    @user = current_user
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to @event, notice: 'Event was successfully updated.' }
        format.json { render :show, status: :ok, location: @event }
      else
        format.html { render :edit }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @user = current_user
    @event.destroy
    respond_to do |format|
      format.html { redirect_to events_url, notice: 'Event was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def get_cal
    @user = current_user
    @events = Event.all
    events = []
    @events.each do |event|
      events << { id: event.id,
                  title: event.gallery.name,
                  start: event.date.to_s + " " + event.start.strftime("%H:%M:%S").to_s,
                  url: Rails.application.routes.url_helpers.event_path(event.id)}
    end
    render :json => events.to_json
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @user = current_user
      @event = Event.find(params[:id])
    end


    def event_params
      params.require(:event).permit(:date, :start, :end, :gallery_id, :artist_id, :art_id, :user_id)
    end

end
