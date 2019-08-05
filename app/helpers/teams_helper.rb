module TeamsHelper
  class TeamsHelper
    def initialize
      @http = NiceHttp.new(NHLApi::Requests.base_url)
    end

    def get_all_teams
      teams = @http.get NHLApi::Requests.all_teams
      data = JSON.parse(teams.data)['teams']
      data.map! do |team|
        team['logo'] = NHLApi::Requests.team_logo(team['id'])
        team
      end
      data.sort { |a, b| a['name'] <=> b['name'] }
    end

    def get_team_with_roster(id)
      team = @http.get NHLApi::Requests.team(id)
      return nil unless (data = JSON.parse(team.data)['teams'])
      data[0]['logo'] = NHLApi::Requests.team_logo(id)
      data[0]['roster']['roster'].map! do |player|
        player['person']['portrait'] = NHLApi::Requests.player_portrait(player['person']['id'])
        player
      end
      data[0]['roster']['roster'].sort! { |a, b| a['person']['fullName'].split(' ')[1] <=> b['person']['fullName'].split(' ')[1] }
      data[0]
    end
  end
end