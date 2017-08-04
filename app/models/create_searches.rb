# class CreateSearches < ActiveRecord::Migration
#   def self.up
#       ActiveRecord::Base.connection.execute <<-SQL
#     CREATE VIEW searches AS
#       SELECT  artists.alias AS searchable_alias, artists.alias AS term,
#               CAST ('Artist' AS varchar) AS searchable_type
#       FROM artists
#       UNION
#       SELECT  arts.genre AS searchable_id, arts.genre AS term,
#               CAST ('Art' AS varchar) AS searchable_type
#       FROM arts
#     SQL
#   end
#
#   def self.down
#     ActiveRecord::Base.connection.execute <<-SQL
#       DROP VIEW searches
#     SQL
#   end
# end
