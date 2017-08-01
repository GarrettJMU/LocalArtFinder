class Event < ApplicationRecord
  belongs_to :gallery
  belongs_to :artist
  belongs_to :art
  validates :user, presence: true
  resourcify
end
