module NHLApi
  module Requests
    def self.base_url
      'https://statsapi.web.nhl.com/api/v1/'
    end

    def self.all_teams
      {
        path: '/teams'
      }
    end

    def self.team_logo(id)
      "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/#{id}.svg"
    end
  end
end