class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise  :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable
        has_many :comments               #commentsテーブルとのアソシエーション
        has_many :messages
        has_many :tweets
        has_many :group_users
        has_many :groups, through: :group_users
        validates :nickname, presence: true, unless: :image?
        mount_uploader :image, ImageUploader
end
