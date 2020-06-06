class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :serving_size, :cal_per_serving
  has_one :user
end
