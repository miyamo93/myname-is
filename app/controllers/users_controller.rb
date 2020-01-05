class UsersController < ApplicationController
  def index
    def index
      respond_to do |format|
        format.html
        format.json
      end
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to tweets_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:nickname ,:image , :email)
  end
end
