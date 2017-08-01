class AddUserToArtists < ActiveRecord::Migration[5.1]
  def change
    add_reference :artists, :user, foreign_key: true
  end
end
