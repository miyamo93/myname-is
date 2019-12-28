class TweetsController < ApplicationController
  
  def index
    @tweets = Tweet.all
  end
  
  def new
    @tweet = Tweet.new
  end

  def create
    Tweet.create( image: params[:image], text: params[:text])
  end

  private
  
  def tweet_params
    params.permit(:name, :image, :text)
  end

end
