class DraftChannel < ApplicationCable::Channel
  def subscribed
    player_team = PlayerTeam.find(params[:team])
    stream_for player_team
  end

  def unsubscribed
  end
end
