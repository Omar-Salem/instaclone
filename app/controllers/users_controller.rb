require "rubygems"
require "httparty"

class UsersController < ApplicationController

  def callback
  end

  def get_user_details
    token = params["token"]

    unless AccessToken.where(:token => token).present?
      AccessToken.create(token: token)
    end

    custom_user = get_custom_user(token)
    render text: custom_user.create_token
  end

  private
  def get_custom_user(token)
    user_details_url = "https://api.instagram.com/v1/users/self/?access_token=#{token}"
    response = HTTParty.get(user_details_url, :verify => false)

    data = response["data"]
    id=data["id"]
    username=data["username"]

    return CustomToken.new(id, token, username)
  end


end
