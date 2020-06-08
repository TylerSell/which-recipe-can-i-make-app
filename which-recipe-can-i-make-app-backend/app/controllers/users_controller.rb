class UsersController < ApplicationController

    def create 
        user = User.new(user_params)

        if user.save 
            session[:user_id] = user.id 
            render json: user 
        else 
            render json: {error: 'Something went wrong please try again'}
        end
    end

    def show
        user = current_user
        # user = User.find_by(id: params[:id])
        render json: user 
    end

    def update 
        user = current_user
        user.update(user_params)
        if user.save 
            render json: user 
        else 
            render json: {error: 'Something went wrong and your changes were not saved. Please try again.'}
        end
    end

# --------------------------------------------------------------

    private 

    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password)
    end 

end
