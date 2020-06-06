class RecipesController < ApplicationController
    
    def create 
        user = User.find_by(id: session[:user_id])
        recipe = user.recipe.build(recipe_params)

        render json: recipe.save ? recipe : {message: 'Something went wrong please try again'}
    end

    def show
        recipe = Recipe.find_by(id: session[:recipe_id])
        render json: recipe 
    end

    def update 
        recipe = Recipe.find_by(id: session[:recipe_id])
        recipe.update(recipe_params)

        render json: recipe.save ? recipe : {message: 'Something went wrong and your changes were not saved. Please try again.'}

    end

    def destroy 
        recipe = Recipe.find_by(id: params[:id])
        recipe.destroy
    end


# --------------------------------------------------------------

    private 

    def recipe_params
        params.require(:recipe).permit(:name, :serving_size, :cal_per_serving, :user_id)
    end
end
