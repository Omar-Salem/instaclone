class HomeController < ApplicationController
  HOST=Rails.application.config.insta_host+"/users/callback"
  CLIENT_ID="ddc5629e25284f14a02604f268ae09c9"

  def index
    @url="https://instagram.com/oauth/authorize/?client_id=#{CLIENT_ID}&redirect_uri=#{HOST}&response_type=token&scope=public_content"
  end
end
