
  json.extract! event, :date, :start, :end, :gallery

  json.url event_url(event, format: :json)
