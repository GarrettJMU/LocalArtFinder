class ArtSearch < ApplicationRecord
  belongs_to :art, optional:true
  def arts
    @Arts ||= find_arts
  end

  private

  def find_arts
    arts = Art.order(:genre)
    arts = arts.where(genre: genre) if genre.present?
    arts = arts.where(price: price) if price.present?
    arts = arts.where(length: length) if length.present?
    arts = arts.where(width: width) if width.present?
    arts = arts.where(medium: medium) if medium.present?
    arts
  end
end
