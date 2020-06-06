class PantryItemsController < ApplicationController
    
    def create 
        user = User.find_by(id: session[:user_id])
        pantry_item = user.pantry_item.build(pantry_item_params)

        render json: pantry_item.save ? pantry_item : {message: 'Something went wrong please try again'}
    end

    # ---------------------------------------------------------------------

    private

    def pantry_item_params
        params.require(:pantry_item).permit(:name, :quantity, :user_id)
    end 

end
