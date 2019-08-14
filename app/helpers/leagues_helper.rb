module LeaguesHelper
  class LeaguesHelper
    def initialize
      @player_teams_helper = PlayerTeamsHelper::PlayerTeamsHelper.new
    end

    def get_rules(league)
      JSON.parse(league.rules)
    end

    def get_player_teams_with_players(league)
      rules = get_rules(league)
      teams = league.player_teams.map do |team|
        puts team.roster
        @player_teams_helper.get_player_team_with_players(team)
      end
      teams.map! do |team|
        team['score'] = team['players'].reduce(0) do |sum, player|
          stats = player['stats'][0]['splits'][0]['stat']
          sum += rules['goalValue'].to_i * stats['goals']
          sum += rules['assistValue'].to_i * stats['assists']
        end
        team
      end
      teams.sort { |a, b| b['score'] <=> a['score'] }
    end

    def setup_draft(league)
      rounds = get_rules(league)['playersPerTeam'].to_i
      users = league.users.map(&:username).shuffle

      queue = []
      count = 0
      while (count += 1) <= rounds
        queue.concat(count.odd? ? users : users.reverse)
      end
      ['draft'].concat(queue).join('|')
    end
  end
end
