class Tweet < ApplicationRecord
  belongs_to :user
  has_many :comments               #commentsテーブルとのアソシエーション
  mount_uploader :image, ImageUploader
end
