require "rubygems"
require "httparty"

class UsersController < ApplicationController

  before_filter :load_services

  def callback
  end

  def get_user_details
    token = params["token"]

    unless AccessToken.where(:token => token).present?
      AccessToken.create(token: token)
    end

    @sync_service.sync(token)

    custom_user = get_custom_user(token)
    create_token = custom_user.create_token
    render json: Hash["username" => custom_user.username, "token" => create_token]
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

  private
  def load_services()
    @sync_service = SyncService.new
  end


end
