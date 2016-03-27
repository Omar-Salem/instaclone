require "rubygems"
require "httparty"

class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def callback
  end

  def sync_media
    token = params["token"]
    url = "https://api.instagram.com/v1/users/self/media/recent/?access_token=#{token}"
    response = HTTParty.get(url, :verify => false)
    response["data"].each do |item|
      next if item["type"]!="image"
      userId="omar salem"
      save_img(item["id"], item["images"], userId)
    end
    render json: response["data"]

  end

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
