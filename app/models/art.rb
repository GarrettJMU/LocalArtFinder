class Art < ApplicationRecord
  belongs_to :artist
  # validates :user, presence: true
  resourcify

def self.search(search)
  if search
    find(:all, :conditions => ['name LIKE ?', "%#{search}%"])
  else
    find(:all)
  end
end

end
