require 'nice_http'

module API
  class PlayersController < ApplicationController
    def players_helper
      @players_helper ||= PlayersHelper::PlayersHelper.new
    end

    def index
      players = players_helper.get_all_active_players
      render json: players, status: :ok
    end

    def show
      player = players_helper.get_player(params[:id], stats: true)
      render json: player, status: :ok
    end
  end
end