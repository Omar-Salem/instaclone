class UsersController < ApplicationController

  def sync_media
    # url = request.original_url
    # idx=url.index('=')
    # @token=url[idx..-1]
    @token=request.original_url
  end

  def get
    u= User.new
    u.handle="koko"
    render json: u
  end
end
