class ToppageController < ApplicationController
  
  def index
    if user_signed_in?
      redirect_to(tweets_path)
    end
  end
end
