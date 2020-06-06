class PantryItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity
  belongs_to :user
end
