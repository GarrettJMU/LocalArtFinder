class Gallery < ApplicationRecord
  # belongs_to :artist
  # belongs_to :art
  # validates :user, presence: true
  
  #CHECK ALL OF THESE ONES TOO!!!!!!!!!!!!!!!!
  
  
  
  
  
  
  resourcify
def self.search(search)
  if search
    find(:all, :conditions => ['name LIKE ?', "%#{search}%"])
  else
    find(:all)
  end
end

end
