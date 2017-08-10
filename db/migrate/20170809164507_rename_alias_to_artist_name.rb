class RenameAliasToArtistName < ActiveRecord::Migration[5.1]
  def change
   rename_column :artists, :alias, :artist_name
   rename_column :advanced_searches, :alias, :artist_name
  end
end
