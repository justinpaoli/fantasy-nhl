module PlayersHelper
  class PlayersHelper
    def initialize
      @http = NiceHttp.new(NHLApi::Requests.base_url)
      @teams_helper = TeamsHelper::TeamsHelper.new
      @seasons_helper = SeasonsHelper::SeasonsHelper.new
    end

    def get_player(id, portrait: false, stats: false)
      player = @http.get NHLApi::Requests.player(id)
      data = JSON.parse(player.data)['people'][0]
      data['portrait'] = NHLApi::Requests.player_portrait(id) if portrait
      data['stats'] = get_player_stats(id) if stats
      data
    end

    def get_player_stats(id)
      player = @http.get NHLApi::Requests.player_stats(id, stats: 'statsSingleSeason', season: @seasons_helper.get_current_season)
      JSON.parse(player.data)['stats']
    end

    def get_all_active_players(goalies: false)
      teams = @teams_helper.get_all_teams
      players = teams.map do |team|
        team_with_roster = @teams_helper.get_team_with_roster(team['id'])
        player_ids = team_with_roster['roster']['roster'].map { |player| player['person']['id'] }
        players =  player_ids.map do |id|
          player = get_player(id, portrait: true, stats: true)
          player['primaryPosition']['code'] != 'G' || goalies ? player : nil
        end
        players.compact
      end
      players.flatten
    end
  end
end
