class Artist < ApplicationRecord
  has_many :arts
  has_many :events
  has_many :advanced_searches
  validates :user, presence: true
  belongs_to :user, optional: true
  
  resourcify
end
