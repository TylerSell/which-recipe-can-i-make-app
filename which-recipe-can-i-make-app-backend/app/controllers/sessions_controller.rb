class SessionsController < ApplicationController
    
    def create
        @user = User.find_by(email: params[:email])

        if @user && @user.authenticate(params[:password])
            session[:user_id] = @user.id 
            render json: @user 
        else 
            render json: {alert: "Invalid Credentials. Please Try Again."}
        end
    end

    def get_current_user
        if logged_in?
            render json: {
                # return the current user json
            } 
        else 
            render json: { alert: "No current User logged in."}
        end
    end


    def destroy
        session.clear
        render json: { alert: "Successfully logged out" }
    end

end