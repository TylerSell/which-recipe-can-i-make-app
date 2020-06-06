# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(first_name: 'Tyler', last_name: 'Sell', email: 'test@test.com', password: 'password')

Recipe.create(name: 'Pasta Caprese', serving_size: '1 cup', cal_per_serving: 370, user_id: 1)
Recipe.create(name: 'Ground Turkey Tacos', serving_size: '1 taco', cal_per_serving: 400, user_id: 1)

PantryItem.create(name: 'Penne', quantity: '1 box', user_id: 1)
PantryItem.create(name: 'Tomatoes', quantity: '1 package', user_id: 1)
PantryItem.create(name: 'Chicken', quantity: '1 bag', user_id: 1)
PantryItem.create(name: 'Olive Oil', quantity: '1 bottle', user_id: 1)
PantryItem.create(name: 'Tortilla Shells', quantity: '1 Package', user_id: 1)
PantryItem.create(name: 'Lettuce', quantity: '1 head', user_id: 1)
PantryItem.create(name: 'Shredded Cheddar Cheese', quantity: '1 bag', user_id: 1)

Ingredient.create(name: 'Penne', quantity: '1 box', recipe_id: 1)
Ingredient.create(name: 'Olive Oil', quantity: '2 Tbsp', recipe_id: 1)
Ingredient.create(name: 'Chicken', quantity: '1 breast', recipe_id: 1)
Ingredient.create(name: 'Tomatoes', quantity: '1 package', recipe_id: 1)
Ingredient.create(name: 'Totilla Shells', quantity: '1 package', recipe_id: 2)
Ingredient.create(name: 'Ground Turkey', quantity: '1 pound', recipe_id: 2)
Ingredient.create(name: 'Onions', quantity: '1 medium size', recipe_id: 2)
Ingredient.create(name: 'Shredded Cheddar Cheese', quantity: '1 bag', recipe_id: 2)
Ingredient.create(name: 'Lettuce', quantity: '1 head', recipe_id: 2)
Ingredient.create(name: 'Tomatoes', quantity: '1/4 package', recipe_id: 2)
Ingredient.create(name: 'Taco Seasoning', quantity: '1 package', recipe_id: 2)

Instruction.create(description: 'Cook Pasta to al Dente', recipe_id: 1)
Instruction.create(description: 'Cut Chicken and cook through', recipe_id: 1)
Instruction.create(description: 'Mix pasta with Olive Oil, cooked chicken, and cooked pasta', recipe_id: 1)
Instruction.create(description: 'Serve', recipe_id: 1)
Instruction.create(description: 'Cook and crumble turkey', recipe_id: 2)
Instruction.create(description: 'Add Taco Seasoning and Onions and cook for 3 minutes', recipe_id: 2)
Instruction.create(description: 'Shred lettuce', recipe_id: 2)
Instruction.create(description: 'Chop tomatoes', recipe_id: 2)
Instruction.create(description: 'Fill tortilla with desired ingredients and serve', recipe_id: 2)