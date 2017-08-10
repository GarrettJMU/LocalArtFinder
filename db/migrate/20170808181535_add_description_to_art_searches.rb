class AddDescriptionToArtSearches < ActiveRecord::Migration[5.1]
  def change
    add_column :art_searches, :description, :string
  end
end
