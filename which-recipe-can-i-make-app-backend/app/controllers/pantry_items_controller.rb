class PantryItemsController < ApplicationController

    def index 
        user = current_user
        pantry_items = user.pantry_items 
        render json: pantry_items
    end
    
    def create 
        user = current_user
        pantry_item = user.pantry_item.build(pantry_item_params)

        render json: pantry_item.save ? pantry_item : {error: 'Something went wrong please try again'}
    end

    def update 
        pantry_item = PantryItem.find_by(id: params[:id])
        if pantry_item.update(pantry_item_params)
            render json: pantry_item
        else 
            render json: {error: 'Something went wrong and your changes were not saved. Please try again.'}
        end
    end 

    def destroy
        pantry_item = PantryItem.find_by(id: params[:id])
        pantry_item.destroy
    end

    # ---------------------------------------------------------------------

    private

    def pantry_item_params
        params.require(:pantry_item).permit(:name, :quantity, :user_id)
    end 

end
