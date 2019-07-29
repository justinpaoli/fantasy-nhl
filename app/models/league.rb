class League < ApplicationRecord
  validates :owner, presence: true
  validates :team_ids, format: { with: /\A[\d,]*\z/, message: 'must be provided as a comma separated list of numbers with no whitespace' }
end
