class PantryItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity
  has_one :user
end
