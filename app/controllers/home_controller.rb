class HomeController < ApplicationController
  STRING = "http://127.0.0.1:3000"
  HOST=STRING+"/users/callback"
  CLIENT_ID="ddc5629e25284f14a02604f268ae09c9"

  def index
    @url="https://instagram.com/oauth/authorize/?client_id=#{CLIENT_ID}&redirect_uri=#{HOST}&response_type=token&scope=public_content"
  end
end
