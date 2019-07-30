class League < ApplicationRecord
  validates :owner, presence: true
  has_many :player_teams
  has_many :users, through: :player_teams
end
