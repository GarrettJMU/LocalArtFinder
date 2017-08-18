class Gallery < ApplicationRecord
  belongs_to :artist
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
