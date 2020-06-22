class Recipe < ApplicationRecord
  belongs_to :user
  has_many :ingredients
  has_many :instructions
  validates :name, presence: true
  accepts_nested_attributes_for :ingredients
  accepts_nested_attributes_for :instructions
  after_update :save_ingredients
  after_update :save_instructions
  validates_associated :instructions
  validates_associated :ingredients

  def new_ingredient_attributes=(ingredient_attributes)
    ingredient_attributes.each do |attributes|
      ingredients.build(attributes)
    end
  end

  def new_instruction_attributes=(instruction_attributes)
    instruction_attributes.each do |attributes|
      instructions.build(attributes)
    end
  end

  def existing_ingredient_attributes=(ingredient_attributes)
    ingredients.reject(&:new_record?).each do |ingredient|
      attributes = ingredient_attributes[ingredient.id.to_s]
      if attributes
        ingredient.attributes = attributes
      else 
        ingredient.delete(ingredient)
      end
    end
  end

  def existing_instruction_attributes=(instruction_attributes)
    instructions.reject(&:new_record?).each do |instruction|
      attributes = instruction_attributes[instruction.id.to_s]
      if attributes
        instruction.attributes = attributes
      else 
        instruction.delete(instruction)
      end
    end
  end

  def save_ingredients
    ingredients.each do |ingredient|
      ingredient.save
    end
  end

  def save_instructions
    instructions.each do |instruction|
      instruction.save
    end
  end

end
