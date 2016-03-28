require "rubygems"
require "httparty"

class ImagesController < ApplicationController

  def get

  end

  def get_id
    render text: get_id_by_user_name()
  end

  def get_images_by_user_id
    render json: Image.where("user_id = ?", params[:user_id])
  end

  private
  def get_id_by_user_name
    username=params[:username]
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

  # def sync_media
  #   arr= CustomToken.validate_token(custom_token)
  #   unless arr[0]
  #     render :status => 400
  #   end
  #
  #   url = "https://api.instagram.com/v1/users/self/media/recent/?access_token=#{token}"
  #   response = HTTParty.get(url, :verify => false)
  #   response["data"].each do |item|
  #     next if item["type"]!="image"
  #     userId="omar salem"
  #     save_img(item["id"], item["images"], item["user"]["id"])
  #   end
  #   render json: response["data"]
  #
  # end

  # private
  # def save_img(img_id, imgDictionary, user_id)
  #
  #   low_resolution = imgDictionary["low_resolution"]["url"]
  #   thumbnail = imgDictionary["thumbnail"]["url"]
  #   standard_resolution = imgDictionary["standard_resolution"]["url"]
  #
  #   Image.create(img_id: img_id,
  #                user_id: user_id,
  #                low_resolution: low_resolution,
  #                thumbnail: thumbnail,
  #                standard_resolution: standard_resolution)
  # end
end
