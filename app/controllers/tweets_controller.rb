class TweetsController < ApplicationController
  before_action :confirmation
  
  def index
    @tweets = Tweet.includes(:user).order("created_at DESC")
  end
  
  def new
    @tweet = Tweet.new
  end

  def create
    @tweet = Tweet.new(tweet_params)
    if @tweet.save
      redirect_to tweets_path(current_user)
    else
      render new, alert: '必須項目を埋めてください。'
    end
  end

  def destroy
    tweet = Tweet.find(params[:id])
    tweet.destroy if tweet.user_id == current_user.id
    if user_signed_in? && current_user.id == tweet.user_id
      if tweet.destroy
        redirect_to(root_path)
      else
        redirect_to action: :edit, notice: "削除できません"
      end
    else
      redirect_to root_path
    end
  end

  def show
    @tweet = Tweet.find(params[:id])
    @comments = @tweet.comments.includes(:user)
    @comment = Comment.new
  end

  private

  def confirmation  #ログインしていない場合ははユーザー登録に移動
    unless user_signed_in?
      redirect_to(user_session_path)
    end
  end

  def tweet_params
    params.require(:tweet).permit(:image, :text).merge(user_id: current_user.id)
  end

end
