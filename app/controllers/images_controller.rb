require "rubygems"
require "httparty"

class ImagesController < ApplicationController

  def get

  end

  def get_id
    username=params[:username]
    render text: get_id_by_user_name(username)
  end

  def get_images_by_user_id
    images = Image.where("user_id = ?", params[:user_id])
    result=Hash["images" => images, "can_edit" => check_can_edit(params)]
    render json: result
  end

  private
  def check_can_edit(params)

    return true
  end

  private
  def get_id_by_user_name(username)
    token=get_random_token()
    url="https://api.instagram.com/v1/users/search?q=#{username}&access_token=#{token}&count=1"
    puts "url is :"+url
    response = HTTParty.get(url, :verify => false)
    return response["data"][0]["id"]
  end

  private
  def get_random_token
    count= AccessToken.count
    idx= rand(count)
    idx+=1
    access_token= AccessToken.find_by_id(idx)
    return access_token.token
  end
end
