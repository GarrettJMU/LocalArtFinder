class AddArtToArtSearches < ActiveRecord::Migration[5.1]
  def change
    add_reference :art_searches, :art, foreign_key: true
  end
end
