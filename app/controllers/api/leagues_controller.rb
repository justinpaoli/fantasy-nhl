module API
  class LeaguesController < ApplicationController
    before_action :authenticate_user, only: [:draft, :edit, :update, :destroy]
    before_action :set_league, only: [:show, :teams, :draft, :edit, :update, :destroy]

    def leagues_helper
      @leagues_helper = LeaguesHelper::LeaguesHelper.new
    end

    def player_teams_helper
      @player_teams_helper = PlayerTeamsHelper::PlayerTeamsHelper.new
    end

    # GET /leagues
    # GET /leagues.json
    def index
      @leagues = League.all
      render json: @leagues, status: :ok
    end

    # GET /leagues/1
    # GET /leagues/1.json
    def show
      render json: @league, status: :ok
    end

    def teams
      teams = leagues_helper.get_player_teams_with_players(@league)
      render json: teams, status: :ok
    end

    # POST /leagues
    # POST /leagues.json
    def create
      @league = League.new(league_params)
      @league.owner = current_user.id
      @league.state = 'created'

      if @league.save
        render json: @league, status: :created
      else
        render json: @league.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /leagues/1
    # PATCH/PUT /leagues/1.json
    def update
      @league.update(league_params)
      @league.state = leagues_helper.setup_draft(@league) if @league.state == 'draft'

      if @league.save
        render json: @league, status: :ok
      else
        render json: @league.errors, status: :unprocessable_entity
      end
    end

    def draft
      player_team = @league.player_teams.select { |team| team.user_id == current_user.id }[0]
      player_teams_helper.add_player_to_roster(player_team, params[:player_id], current_user)
      render json: player_team, status: :ok
    end

    # DELETE /leagues/1
    # DELETE /leagues/1.json
    def destroy
      @league.destroy
      respond_to do |format|
        format.html { redirect_to leagues_url, notice: 'League was successfully destroyed.' }
        format.json { head :no_content }
      end
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_league
        @league = League.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def league_params
        params.require(:league).permit(:owner, :state, :name, :season, :rules, :team_ids)
      end
  end
end