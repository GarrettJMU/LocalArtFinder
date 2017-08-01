class Customer < ApplicationRecord
  validates :user, presence: true
  resourcify
end
