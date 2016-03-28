require 'rubygems'
require 'hmac-md5'

class CustomToken
  attr_accessor :token, :userId, :username
  SECRET="9SyECk96oDsTmXmjOR8cbXTvoPjX+Pq/T/b1fogIieDI0cD/8FpnojlYSUJT5U9I/FGVmBz5oskPqpHX0lYm0oCBjXWICA=="
  SEPARATOR = "#"

  def initialize(userId, token, username)
    @userId=userId
    @token=token.to_s
    @username=username
  end

  def self.validate_token(token)
    arr= token.split(SEPARATOR)

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
    plain = Base64.strict_encode64(json)
    hashed = Base64.strict_encode64(self.class.compute_hash(json))
    return plain+SEPARATOR+hashed
  end

  def to_s
    "userId:#{@userId},@token:#{@token},@username:#{@username}"
  end

  private
  def self.compute_hash(data)
    HMAC::MD5.new(SECRET).update(data).hexdigest
  end
end