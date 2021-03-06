class ApplicationController < ActionController::Base
  before_action :basic_auth
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?


  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname, :image])
  end

  def after_sign_in_path_for(resource)
    tweets_path
  end

  private
    def sign_in_required
        redirect_to new_user_session_url unless user_signed_in?
    end

    def basic_auth
      authenticate_or_request_with_http_basic do |username, password|
        username == 'admin' && password == '1993'
      end
    end
end
