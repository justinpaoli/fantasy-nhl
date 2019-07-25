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
      data.map! do |team|
        team['logo'] = NHLApi::Requests.team_logo(team['id'])
        team
      end
      data.sort! { |a, b| a['name'] <=> b['name'] }

      render json: data
    end

    def show
      id = params['id']
      http = nhl_api
      team = http.get NHLApi::Requests.team(id)
      unless (data = JSON.parse(team.data)['teams'])
        render plain: "Could not find team with ID: #{id}", status: :bad_request
        return
      end
      data[0]['logo'] = NHLApi::Requests.team_logo(id)
      data[0]['roster']['roster'].map! do |player|
        player['person']['portrait'] = NHLApi::Requests.player_portrait(player['person']['id'])
        player
      end
      data[0]['roster']['roster'].sort! { |a, b| a['person']['fullName'].split(' ')[1] <=> b['person']['fullName'].split(' ')[1] }

      render json: data[0]
    end
  end
end