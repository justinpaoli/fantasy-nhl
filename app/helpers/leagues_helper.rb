module LeaguesHelper
  class LeaguesHelper
    def initialize
      @player_teams_helper = PlayerTeamsHelper::PlayerTeamsHelper.new
    end

    def get_player_teams_with_players(league)
      league.player_teams.map do |team|
        puts team.roster
        @player_teams_helper.get_player_team_with_players(team)
      end
    end
  end
end
