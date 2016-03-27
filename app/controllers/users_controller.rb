require "rubygems"
require "httparty"

class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def callback
  end

  def get_user_details
    token = params["token"]
    userDetailsUrl = "https://api.instagram.com/v1/users/self/?access_token=#{token}"
    response = HTTParty.get(userDetailsUrl, :verify => false)
    userId=response["data"]["id"]
    customUser= CustomToken.new(userId, token)
    custom_token = customUser.create_token
    puts "custom_token:"+custom_token
    render text: custom_token
  end

  def sync_media
    custom_token = request.headers['token']
    arr= CustomToken.validate_token(custom_token)
    unless arr[0]
      render :status => 400
    end

    url = "https://api.instagram.com/v1/users/self/media/recent/?access_token=#{arr[1]["token"]}"
    response = HTTParty.get(url, :verify => false)
    response["data"].each do |item|
      next if item["type"]!="image"
      userId="omar salem"
      save_img(item["id"], item["images"], userId)
    end
    render json: response["data"]

  end

  private
  def save_img(imgId, imgDictionary, userId)
    puts "imgId is "+imgId

    puts imgDictionary["low_resolution"]["url"]
    puts imgDictionary["thumbnail"]["url"]
    puts imgDictionary["standard_resolution"]["url"]
  end

  def get
    # Rails.logger.debug "My debug log jhjhjj"
    # puts "13246579"
    # u= User.new
    # u.handle="koko"
    # render json: u
  end
end
