class Artist < ApplicationRecord
  has_many :arts
  validates :user, presence: true
  belongs_to :user, optional: true
  resourcify
end
