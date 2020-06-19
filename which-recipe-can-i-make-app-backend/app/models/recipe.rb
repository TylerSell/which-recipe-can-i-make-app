class Recipe < ApplicationRecord
  belongs_to :user
  has_many :ingredients
  has_many :instructions
  validates :name, presence: true
  accepts_nested_attributes_for :ingredients
  accepts_nested_attributes_for :instructions

  def ingredient_attributes=(ingredient_attributes)
    ingredient_attributes.each do |attributes|
      ingredients.build(attributes)
    end
  end

  def instruction_attributes=(instruction_attributes)
    instruction_attributes.each do |attributes|
      instructions.build(attributes)
    end
  end

  
end
