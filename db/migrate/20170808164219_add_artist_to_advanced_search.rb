class AddArtistToAdvancedSearch < ActiveRecord::Migration[5.1]
  def change
    add_reference :advanced_searches, :artist, foreign_key: true
  end
end
