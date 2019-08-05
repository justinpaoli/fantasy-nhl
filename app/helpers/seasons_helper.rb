module SeasonsHelper
  class SeasonsHelper
    def initialize
      @http = NiceHttp.new(NHLApi::Requests.base_url)
    end

    def get_current_season
      response = @http.get NHLApi::Requests.current_season
      JSON.parse(response.data)['seasons'][0]['seasonId']
    end
  end
end