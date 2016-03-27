class CustomToken
  require 'rubygems'
  # require 'base64'
  # require 'cgi'
  require 'hmac-md5'
  attr_accessor :token, :userId
  SECRET="9SyECk96oDsTmXmjOR8cbXTvoPjX+Pq/T/b1fogIieDI0cD/8FpnojlYSUJT5U9I/FGVmBz5oskPqpHX0lYm0oCBjXWICA=="
  SEPERATOR = "#"

  def initialize(userId, token)
    @userId=userId
    @token=token.to_s
  end

  def self.validate_token(token)
    arr= token.split(SEPERATOR)

    if arr.size!=2
      return false, nil
    end

    plain = Base64.decode64(arr[0])
    hash = Base64.decode64(arr[1])

    if compute_hash(plain)!=hash
      return false, nil
    end

    return true, JSON.parse(plain)
  end

  def create_token
    json= self.to_json
    plain = Base64.encode64(json)
    hashed = Base64.encode64(self.class.compute_hash(json))
    return plain+SEPERATOR+hashed
  end

  private
  def self.compute_hash(data)
    HMAC::MD5.new(SECRET).update(data).hexdigest
  end
end