class CreateArtSearches < ActiveRecord::Migration[5.1]
  def change
    create_table :art_searches do |t|
      t.string :genre
      t.integer :price
      t.decimal :length
      t.decimal :width
      t.string :medium

      t.timestamps
    end
  end
end
