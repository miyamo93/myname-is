class CommentsController < ApplicationController
  before_action :set_tweet

  def create
    @comment = @tweet.comments.new(comment_params)
    if @comment.save
      respond_to do |format|
        format.html { redirect_to tweet_path(@tweet)  }
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:text, :tweet_id).merge(user_id: current_user.id)
  end

  def set_tweet
    @tweet = Tweet.find(params[:tweet_id])
  end
end
