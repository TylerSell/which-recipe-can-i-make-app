class InstructionSerializer < ActiveModel::Serializer
  attributes :id, :description
  belongs_to :recipe
end
