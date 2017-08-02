class Art < ApplicationRecord
  belongs_to :artist
  # validates :user, presence: true
  resourcify
end
