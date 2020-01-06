json.array! @users do |user|
  json.id user.id
  json.name user.nickname
  json.image user.image
end