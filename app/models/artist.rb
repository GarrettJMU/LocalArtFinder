class Artist < ApplicationRecord
  scope :price, -> (price) { where price: price }
  scope :artist_name, -> (artist_name) { where("artist_name like ?", "#{artist_name}%")}
  has_many :arts
  has_many :events
  has_many :advanced_searches
  validates :user, presence: true
  belongs_to :user, optional: true
  include Filterable
  filterrific(
  default_filter_params: { sorted_by: 'artist_name_asc' },
  available_filters: [
    :sorted_by
  ]
)
  # scope :sorted_by, lambda { |sort_option|
  # # extract the sort direction from the param value.
  # direction = (sort_option =~ /desc$/) ? 'desc' : 'asc'
  # case sort_option.to_s
  # when /^artist_name_/
  #   order("artists.artist_name #{ direction }")
  # else
  #   raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
  # end
  # }
  #
  #   def self.options_for_sorted_by
  #   [
  #     ['Artist Name (a-z)', 'artist_name_asc'],
  #
  #   ]
  # end
  resourcify
end
