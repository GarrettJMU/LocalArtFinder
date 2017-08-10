class Artist < ApplicationRecord
  scope :price, -> (price) { where price: price }
  scope :artist_name, -> (artist_name) { where("artists_name like ?", "#{artist_name}%")}
  has_many :arts
  has_many :events
  has_many :advanced_searches
  validates :user, presence: true
  belongs_to :user, optional: true
  include Filterable
  resourcify
end
