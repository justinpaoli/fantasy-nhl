require 'nice_http'

module API
  class TeamsController < ApplicationController
    include NHLApi::Requests

    def index
      http = NiceHttp.new(NHLApi::Requests.base_url)
      teams = http.get NHLApi::Requests.all_teams
      data = JSON.parse(teams.data)['teams']

      render json: data
    end
  end
end