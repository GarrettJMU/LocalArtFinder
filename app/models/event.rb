class Event < ApplicationRecord
  belongs_to :gallery
  belongs_to :artist
  belongs_to :art
  include Filterable
  validates :user, presence: true
  belongs_to :user, optional: true
  resourcify

# def self.search(search)
#   if search
#     find(:all, :conditions => ['name LIKE ?', "%#{search}%"])
#   else
#     find(:all)
#   end
# end

end
