module API
  class TeamsController < ApplicationController
    def teams_helper
      @teams_helper ||= TeamsHelper::TeamsHelper.new
    end

    def index
      render json: teams_helper.get_all_teams, status: :ok
    end

    def show
      if (team = teams_helper.get_team_with_roster(params[:id]))
        render json: team
      else
        render plain: "Could not find team with ID: #{id}", status: :bad_request
      end
    end
  end
end