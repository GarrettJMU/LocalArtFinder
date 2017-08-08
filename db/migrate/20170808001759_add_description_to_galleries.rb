class AddDescriptionToGalleries < ActiveRecord::Migration[5.1]
  def change
    add_column :galleries, :description, :text
  end
end
