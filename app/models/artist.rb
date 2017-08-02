class Artist < ApplicationRecord
  has_many :arts
  # validates :user, presence: true
  resourcify
end
