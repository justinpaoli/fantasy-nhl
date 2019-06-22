require 'nice_http'

module API
  class TeamsController < ApplicationController
    def index
      teams_http = NiceHttp.new(NHLApi::Requests.base_url)
      teams = teams_http.get NHLApi::Requests.all_teams
      data = JSON.parse(teams.data)['teams']
      data.map! do |team|
        team['logo'] = NHLApi::Requests.team_logo(team['id'])
        team
      end

      render json: data
    end
  end
end