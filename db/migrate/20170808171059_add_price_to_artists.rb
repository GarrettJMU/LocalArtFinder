class AddPriceToArtists < ActiveRecord::Migration[5.1]
  def change
    add_column :artists, :price, :string
  end
end
