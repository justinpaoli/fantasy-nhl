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
  end
end