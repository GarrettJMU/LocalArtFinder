class AdvancedSearch < ApplicationRecord


  def artists
  @artists ||= find_artists
  end

  def find_artists

      artists = Artist.advanced_search(artist_name: artist_name)
      artists = a.where(first_name: first_name) if artist_name.present?
      artists = a.where(price: price) if price.present?
  end


end
