class HomeController < ApplicationController
  def index
    string = "http://127.0.0.1:3000"
    host=string+"/users/callback"
    client_id="ddc5629e25284f14a02604f268ae09c9"
    @url="https://instagram.com/oauth/authorize/?client_id=#{client_id}&redirect_uri=#{host}&response_type=token&scope=public_content"
  end
end
