require 'nice_http'

module API
  class TeamsController < ApplicationController
    def nhl_api
      @nhl_api ||= NiceHttp.new(NHLApi::Requests.base_url)
    end

    def index
      http = nhl_api
      teams = http.get NHLApi::Requests.all_teams
      data = JSON.parse(teams.data)['teams']
      puts teams.data
      data.map! do |team|
        team['logo'] = NHLApi::Requests.team_logo(team['id'])
        team
      end
      data.sort! { |a, b| a['name'] <=> b['name']}

      render json: data
    end

    def team
      id = params['id']
      http = nhl_api
      team = http.get NHLApi::Requests.team(id)
      data = JSON.parse(team.data)['teams'][0]
      data['roster']['roster'].map! do |player|
        player['person']['portrait'] = NHLApi::Requests.player_portrait(player['person']['id'])
        player
      end

      render json: data
    end
  end
end