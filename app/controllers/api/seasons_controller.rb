require 'nice_http'

module API
  class SeasonsController < ApplicationController
    def seasons_helper
      @seasons_helper ||= SeasonsHelper::SeasonsHelper.new
    end

    def current
      season = seasons_helper.get_current_season
      render plain: season, status: :ok
    end
  end
end