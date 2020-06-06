class IngredientSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity
  has_one :recipe
end
