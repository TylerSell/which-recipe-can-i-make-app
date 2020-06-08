class InstructionsController < ApplicationController

    def index 
        recipe = Recipe.find_by(id: params[:recipe_id])
        instructions = recipe.instructions
        render json: instructions
    end
    
    def create 
        recipe = Recipe.find_by(id: params[:recipe_id])
        instruction = recipe.instruction.build(instruction_params)

        render json: instruction.save ? instruction : {error: 'Something went wrong please try again'}
    end

    def update 
        instruction = Instruction.find_by(id: params[:id])
        instruction.update(instruction_params)

        render json: instruction.save ? instruction : {error: 'Something went wrong and your changes were not saved. Please try again.'}
    end


    # ---------------------------------------------------------------------

    private

    def instruction_params
        params.require(:instruction).permit(:description, :recipe_id)
    end 
end
