class SessionsController < ApplicationController
    
    def create
        @user = User.find_by(email: params[:email])

        if @user && @user.authenticate(params[:password])
            session[:user_id] = @user.id 
            render json: @user 
        else 
            render json: {error: "Invalid Credentials. Please Try Again."}
        end
    end

    def get_current_user
        if logged_in?
            render json: current_user, serializer: UserSerializer
        else 
            render json: { error: "No current User logged in."}
        end
    end


    def destroy
        session.clear
        render json: { message: "Successfully logged out" }
    end

end