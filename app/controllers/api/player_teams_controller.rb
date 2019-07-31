module API
  class PlayerTeamsController < ApplicationController
    before_action :set_player_team, only: [:show, :edit, :update, :destroy]
    before_action :authenticate_user, only: [:create]
    before_action :validate_owner, only: [:update, :destroy]

    # GET /player_teams
    # GET /player_teams.json
    def index
      @player_teams = PlayerTeam.all
      render json: @player_teams, status: :ok
    end

    # GET /player_teams/1
    # GET /player_teams/1.json
    def show
      render json: @player_team, status: :ok
    end

    # POST /player_teams
    # POST /player_teams.json
    def create
      @player_team = PlayerTeam.new(player_team_params)

      if @player_team.save
        render json: @player_team, status: :created
      else
        render json: @player_team.errors, status: :unprocessable_entity
      end
    end

    # PUT /player_teams/1
    # PUT /player_teams/1.json
    def update
      if @player_team.update(player_team_params)
        render json: @player_team, status: :ok
      else
        render json: @player_team.errors, status: :unprocessable_entity
      end
    end

    # DELETE /player_teams/1
    # DELETE /player_teams/1.json
    def destroy
      @player_team.destroy
      respond_to do |format|
        format.html { redirect_to player_teams_url, notice: 'Player team was successfully destroyed.' }
        format.json { head :no_content }
      end
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_player_team
        @player_team = PlayerTeam.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def player_team_params
        params.require(:player_team).permit(:user_id, :league_id, :name, :roster)
      end

      def authenticate_user
        render plain: 'Failed to authenticate user', status: :unauthorized unless player_team_params[:user_id] == session[:user_id]
      end

      def validate_owner
        render plain: 'Failed to authenticate team owner', status: :forbidden unless session[:user_id] == @player_team.user_id
      end
  end
end