class User < ApplicationRecord
  has_secure_password
  validates :username, uniqueness: true
  has_many :player_teams

  def self.from_token_request request
    username = request.params["auth"] && request.params["auth"]["username"]
    self.find_by username: username
  end
end
