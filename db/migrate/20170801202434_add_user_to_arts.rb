class AddUserToArts < ActiveRecord::Migration[5.1]
  def change
    add_reference :arts, :user, foreign_key: true
  end
end
