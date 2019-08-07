class LoadActivePlayersJob < ApplicationJob
  queue_as :default

  def players_helper
    @players_helper = PlayersHelper::PlayersHelper.new
  end

  # TODO: Figure out how often to schedule this
  def perform(goalies: false)
    players_helper.cache_all_active_players(goalies: goalies)
  end
end
