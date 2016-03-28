class AccessToken < ActiveRecord::Base

  def to_s
    return "token:#{token}"
  end
end
