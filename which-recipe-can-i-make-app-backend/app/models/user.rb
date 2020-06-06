class User < ApplicationRecord
    has_many :recipes
    has_many :pantry_items
end
