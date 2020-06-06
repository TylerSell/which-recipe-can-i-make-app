class IngredientSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity
  belongs_to :recipe
end
