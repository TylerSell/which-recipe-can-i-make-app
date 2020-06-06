class InstructionSerializer < ActiveModel::Serializer
  attributes :id, :description
  has_one :recipe
end
