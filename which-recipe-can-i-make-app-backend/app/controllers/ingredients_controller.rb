class IngredientsController < ApplicationController

    def index 
        recipe = Recipe.find_by(id: params[:recipe_id])
        ingredients = recipe.ingredients
        render json: ingredients
    end
    
    def create 
        recipe = Recipe.find_by(id: params[:recipe_id])
        ingredient = recipe.ingredient.build(ingredient_params)

        render json: ingredient.save ? ingredient : {error: 'Something went wrong please try again'}
    end

    def update 
        ingredient = Ingredient.find_by(id: params[:id])
        ingredient.update(ingredient_params)

        render json: ingredient.save ? ingredient : {error: 'Something went wrong and your changes were not saved. Please try again.'}
    end

    # ---------------------------------------------------------------------

    private

    def ingredient_params
        params.require(:ingredient).permit(:name, :quantity, :recipe_id)
    end 
end
