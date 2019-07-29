require 'nice_http'

module API
  class SeasonsController < ApplicationController
    def nhl_api
      @nhl_api ||= NiceHttp.new(NHLApi::Requests.base_url)
    end

    def current
      http = nhl_api
      response = http.get NHLApi::Requests.current_season
      season = JSON.parse(response.data)['seasons'][0]['seasonId']
      render plain: season, status: :ok
    end
  end
end