class AddPriceToAdvancedSearch < ActiveRecord::Migration[5.1]
  def change
    add_column :advanced_searches, :price, :string
  end
end
