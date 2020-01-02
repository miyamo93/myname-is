class CommentsController < ApplicationController

  def create
  end

  private

  def comment_params
    params.require(:comment).permit(:text, :tweet_id).merge(user_id: current_user.id)
  end

  def set_comment
    
  end
end
