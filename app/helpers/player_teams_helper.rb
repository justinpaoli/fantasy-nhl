module PlayerTeamsHelper
  class PlayerTeamsHelper
    def initialize
      @players_helper = PlayersHelper::PlayersHelper.new
      @users_helper = UsersHelper::UsersHelper.new
    end

    def get_player_team_with_players(player_team)
      team = player_team.attributes
      roster = player_team.roster.split(',')
      team['owner'] = @users_helper.get_username(player_team.user_id)
      team['players'] = roster.map do |id|
        @players_helper.get_player(id, stats: true)
      end
      team
    end

    def add_player_to_roster(player_team, id, user)
      state, *queue = player_team.league.state.split('|')
      return false unless state == 'draft' && user.username == queue[0]

      roster = player_team.roster.split(',')
      roster << id
      player_team.roster = roster.uniq.join(',')
      queue.shift
      player_team.league.state = [state, *queue].join('|')

      player_team.save
      player_team.league.save
      DraftChannel.broadcast_to player_team.league, { teams: player_team.league.player_teams, state: player_team.league.state }.as_json
    end
  end
end
