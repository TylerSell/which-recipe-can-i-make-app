class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :serving_size, :cal_per_serving
  belongs_to :user
  has_many :ingredients
  has_many :instructions
end
