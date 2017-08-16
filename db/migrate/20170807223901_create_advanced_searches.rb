class CreateAdvancedSearches < ActiveRecord::Migration[5.1]
  def change
    create_table :advanced_searches do |t|
      t.string :keywords
      t.string :alias
      t.string :genre

      t.timestamps
    end
  end
end
