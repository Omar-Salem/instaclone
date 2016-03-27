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
    puts response
    render json: response["data"]

  end

  def get
    # Rails.logger.debug "My debug log jhjhjj"
    # puts "13246579"
    # u= User.new
    # u.handle="koko"
    # render json: u
  end
end
