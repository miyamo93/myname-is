class TweetsController < ApplicationController
  
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

  def show
    @tweet = Tweet.find(params[:id])
    
    @comments = @tweet.comments.includes(:user)
    @comment = Comment.new
  end

  private

  def tweet_params
    params.require(:tweet).permit(:image, :text).merge(user_id: current_user.id)
  end

end
