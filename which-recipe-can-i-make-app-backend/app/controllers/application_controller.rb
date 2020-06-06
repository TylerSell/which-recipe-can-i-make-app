class ApplicationController < ActionController::API
    # before_action :message_if_not_authenticated 
    # helper_method :current_user

    # ---------------------------------------------------------

    private 

    def current_user 
        @user ||= User.find_by(id: session[:user_id])
    end 

    def user_authenticated 
        !!session[:user_id]
    end 

    # def message_if_not_authenticated
    #     self.errors.add(:not_logged_in, "You are not logged in or do not have privelidges to view this.") unless user_authenticated
    # end

end
