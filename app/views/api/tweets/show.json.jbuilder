json.array! @comments do |comment|
  json.text comment.text
  json.user_name comment.user.nickname
  json.id comment.id
end
