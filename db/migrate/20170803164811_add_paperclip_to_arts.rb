class AddPaperclipToArts < ActiveRecord::Migration[5.1]
  def change
    add_attachment :arts, :image
  end
end
