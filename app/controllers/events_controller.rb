class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:show, :index, :get_cal]
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
  end

  # GET /events/1/edit
  def edit
  end

  # POST /events
  # POST /events.json
  def create
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
    @event.destroy
    respond_to do |format|
      format.html { redirect_to events_url, notice: 'Event was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

#compiles json data for calendar events
  def get_cal
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
#end of json data for calendar

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def event_params
      params.require(:event).permit(:date, :start, :end, :gallery_id, :artist_id, :art_id, :user_id)
    end
end
