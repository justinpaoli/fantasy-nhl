module PlayerTeamsHelper
  class PlayerTeamsHelper
    def initialize; end

    def add_player_to_roster(player_team, id)
      roster = player_team.roster.split(',')
      roster = roster + [id]
      player_team.roster = roster.uniq.join(',')
      player_team.save
      DraftChannel.broadcast_to player_team.league, player_team.league.player_teams.as_json
    end
  end
end
