json.array! @tweets do |tweet|
  json.text tweet.comments.text
  json.user_name tweet.user.nickname
  json.id tweet.comments.id
end
