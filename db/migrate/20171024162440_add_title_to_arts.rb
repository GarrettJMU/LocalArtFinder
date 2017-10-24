class AddTitleToArts < ActiveRecord::Migration[5.1]
  def change
    add_column :arts, :title, :varchar
  end
end
