class InstructionsController < ApplicationController
    
    def create 
        recipe = Recipe.find_by(id: :recipe_id)
        instruction = recipe.instruction.build(instruction_params)

        render json: instruction.save ? instruction : {message: 'Something went wrong please try again'}
    end

    # ---------------------------------------------------------------------

    private

    def instruction_params
        params.require(:instruction).permit(:description, :recipe_id)
    end 
end
