class DraftChannel < ApplicationCable::Channel
  def subscribed
    league = League.find(params[:league])
    stream_for league
  end

  def unsubscribed
  end
end
