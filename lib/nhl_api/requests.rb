module NHLApi
  module Requests
    def self.base_url
      'https://statsapi.web.nhl.com/api/v1/'
    end

    def self.current_season
      {
        path: '/seasons/current'      
      }
    end

    def self.all_teams
      {
        path: '/teams'
      }
    end

    def self.team_logo(id)
      "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/#{id}.svg"
    end

    def self.team(id)
      {
        path: "/teams/#{id}?expand=team.roster"
      }
    end

    def self.player_portrait(id)
      "https://nhl.bamcontent.com/images/headshots/current/168x168/#{id}.jpg"
    end
  end
end