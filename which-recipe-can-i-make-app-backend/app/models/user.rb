class User < ApplicationRecord
    has_secure_password
    
    has_many :recipes
    has_many :pantry_items

    validates :first_name, :presence => true, :length => { :minimum => 2 }
    validates :last_name, :presence => true, :length => { :minimum => 2 }
    validates :email, :uniqueness => { :case_sensitive => false }, :format => { :with => URI::MailTo::EMAIL_REGEXP }
    validates :password, :length => { :within => 6..40, :message => "Password must be between 6 and 40 characters" }, :on => :create
    validates :password, :length => { :within => 6..40, :message => "Password must be between 6 and 40 characters" }, :on => :update, :unless => :password.blank?
    
end


