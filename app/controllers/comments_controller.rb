class CommentsController < ApplicationController
  before_action :set_tweet

  def create
    @comment = @tweet.comments.new(set_tweet)
    redirect_to  tweet_path(set_tweet)
  end

  private

  def comment_params
    params.require(:comment).permit(:text, :tweet_id).merge(user_id: current_user.id)
  end

  def set_tweet
    @tweet = Tweet.find(params[:id])
  end
end
