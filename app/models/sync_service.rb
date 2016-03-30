require "rubygems"
require "httparty"

class SyncService

  def sync(token)
    url = "https://api.instagram.com/v1/users/self/media/recent/?access_token=#{token}"
    response = HTTParty.get(url, :verify => false)
    response["data"].each do |item|
      next if item["type"]!="image"
      save_img(item["id"], item["images"], item["user"]["id"])
    end
  end

  private
  def save_img(img_id, imgDictionary, user_id)

    low_resolution = imgDictionary["low_resolution"]["url"]
    thumbnail = imgDictionary["thumbnail"]["url"]
    standard_resolution = imgDictionary["standard_resolution"]["url"]

    begin
      Image.create(img_id: img_id,
                   user_id: user_id,
                   low_resolution: low_resolution,
                   thumbnail: thumbnail,
                   standard_resolution: standard_resolution)
    rescue ActiveRecord::RecordNotUnique
    end
  end
end