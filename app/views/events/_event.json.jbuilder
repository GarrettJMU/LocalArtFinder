
  json.extract! event, :id, :date, :start, :end, :gallery

  json.url event_url(event, format: :json)
