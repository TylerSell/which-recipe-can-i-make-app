class IngredientsController < ApplicationController
    
    def create 
        recipe = Recipe.find_by(id: :recipe_id)
        ingredient = recipe.ingredient.build(ingredient_params)

        render json: ingredient.save ? ingredient : {message: 'Something went wrong please try again'}
    end

    # ---------------------------------------------------------------------

    private

    def ingredient_params
        params.require(:ingredient).permit(:name, :quantity, :recipe_id)
    end 
end
