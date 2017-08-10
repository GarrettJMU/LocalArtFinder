class Art < ApplicationRecord
  belongs_to :artist
  belongs_to :user
  validates :user, presence: true
  has_attached_file :image, styles: { small: "64x64", med: "100x100", large: "200x200" }
  validates_attachment :image, presence: true,
    content_type: { content_type: ["image/jpg", "image/jpeg", "image/png", "image/gif"] },
    size: { in: 0..10.megabytes }

    filterrific(
    default_filter_params: { sorted_by: 'price_asc' },
    available_filters: [
      :sorted_by
    ]
  )

scope :sorted_by, lambda { |sort_option|
# extract the sort direction from the param value.
direction = (sort_option =~ /desc$/) ? 'desc' : 'asc'
case sort_option.to_s
when /^medium_/
  order("arts.medium #{ direction }")
when /^genre_/
  order("arts.genre #{ direction }")
when /^length_/
  order("arts.length #{ direction }")
when /^width_/
  order("arts.width #{ direction }")
when /^price_/
  order("arts.price #{ direction }")
else
  raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
end
}

  def self.options_for_sorted_by
  [
    ['Medium (a-z)', 'medium_asc'],
    ['Genre (a-z)', 'genre_asc'],
    ['Length (longest-shortest)', 'length_desc' ],
    ['Length (shortest-longest)', 'length_asc' ],
    ['Width (longest-shortest)', 'width_desc'],
    ['Width (shortest-longest)', 'width_asc'],
    ['Price (most-least)', 'price_desc'],
    ['Price (least-most)', 'price_asc']

  ]
end

  resourcify



# def self.search(search)
#   if search
#     find(:all, :conditions => ['name LIKE ?', "%#{search}%"])
#   else
#     find(:all)
#   end
# end

end
