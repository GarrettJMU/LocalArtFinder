json.extract! artist, :id, :artist_name, :first_name, :last_name, :email, :password, :street, :city, :state, :zipcode, :website, :sales, :phone, :created_at, :updated_at
json.url artist_url(artist, format: :json)
