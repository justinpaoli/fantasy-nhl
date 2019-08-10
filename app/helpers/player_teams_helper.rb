module PlayerTeamsHelper
  class PlayerTeamsHelper
    def initialize
      @players_helper ||= PlayersHelper::PlayersHelper.new
    end

    def get_player_team_with_players(player_team)
      team = player_team.attributes
      roster = player_team.roster.split(',')
      team['players'] = roster.map do |id|
        @players_helper.get_player(id)
      end
      team
    end

    def add_player_to_roster(player_team, id)
      roster = player_team.roster.split(',')
      roster = roster + [id]
      player_team.roster = roster.uniq.join(',')
      player_team.save
      DraftChannel.broadcast_to player_team.league, player_team.league.player_teams.as_json
    end
  end
end
