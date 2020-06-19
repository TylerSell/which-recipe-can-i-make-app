class RecipesController < ApplicationController

    def index
        user = current_user
        recipes = user.recipes
        render json: recipes
    end
    
    def create 
        user = current_user
        recipe = user.recipe.build(recipe_params)

        render json: recipe.save ? recipe : {error: 'Something went wrong please try again'}
    end

    def show
        recipe = Recipe.find_by(id: params[:id])
        render json: recipe 
    end

    def update 
        recipe = Recipe.find_by(id: params[:id])
        recipe.update(recipe_params)

        render json: recipe.save ? recipe : {error: 'Something went wrong and your changes were not saved. Please try again.'}

    end

    def destroy 
        recipe = Recipe.find_by(id: params[:id])
        recipe.destroy
    end


# --------------------------------------------------------------

    private 

    def recipe_params
        params.require(:recipe).permit(:name, :serving_size, :cal_per_serving, :user_id, ingredient_attributes: [:id, :name, :quantity, :recipe_id], instruction_attributes: [:id, :description, :recipe_id])
    end
end
