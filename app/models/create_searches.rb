# class CreateSearches < ActiveRecord::Migration
#   def self.up
#     ActiveRecord::Base.connection.execute <<-SQL
#     CREATE VIEW searches AS
#       SELECT  artists.id AS searchable_id, artists.name AS term,
#               CAST ('Artist' AS varchar) AS searchable_type
#       FROM artists
#       UNION
#       SELECT  books.id AS searchable_id, books.title AS term,
#               CAST ('Book' AS varchar) AS searchable_type
#       FROM books
#     SQL
#   end
#
#   def self.down
#     ActiveRecord::Base.connection.execute <<-SQL
#       DROP VIEW searches
#     SQL
#   end
# end
