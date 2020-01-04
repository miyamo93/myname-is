class Api::TweetsController < ApplicationController
  def show
    # ルーティングでの設定によりparamsの中にgroup_idというキーでグループのidが入るので、これを元にDBからグループを取得する
    tweet = Tweet.find(params[:tweet_id])
    # ajaxで送られてくる最後のメッセージのid番号を変数に代入
    last_message_id = params[:id].to_i
    # 取得したグループでのメッセージ達から、idがlast_message_idよりも新しい(大きい)メッセージ達のみを取得
    @comments = tweet.comments.includes(:user).where("id > #{last_message_id}")
  end
end