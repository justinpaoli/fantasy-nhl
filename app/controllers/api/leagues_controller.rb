module API
  class LeaguesController < ApplicationController
    before_action :set_league, only: [:show, :edit, :update, :destroy]
    before_action :authenticate_user, only: [:create]
    before_action :validate_owner, only: [:update, :destroy]

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

    # POST /leagues
    # POST /leagues.json
    def create
      @league = League.new(league_params)

      if @league.save
        render json: @league, status: :created
      else
        render json: @league.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /leagues/1
    # PATCH/PUT /leagues/1.json
    def update
      if @league.update(league_params)
        format.json { render :show, status: :ok, location: @league }
      else
        format.json { render json: @league.errors, status: :unprocessable_entity }
      end
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

      def authenticate_user
        unless league_params[:owner] == session[:user_id]
          render plain: 'Failed to authenticate user', status: :unauthorized
          raise '401 Unauthorized'
        end
      end

      def validate_owner
        unless session[:user_id] == @league.owner
          render plain: 'Failed to authenticate league owner', status: :unauthorized
          raise '401 Unauthorized'
        end
      end
  end
end