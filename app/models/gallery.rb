class Gallery < ApplicationRecord
  belongs_to :artist
  belongs_to :art
  validates :user, presence: true
  resourcify
end
