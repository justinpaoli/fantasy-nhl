class SessionsController < ApplicationController
  def create
    @user = User.find_by(username: params[:username])

    if @user&.authenticate(params[:password])
      session[:user_id] = @user.id
      gon.global.user = { id: @user.id, username: @user.username }
      render json: { message: "Successfully logged in user: #{@user.username}", user: gon.global.user }, status: :ok
    else
      render plain: 'Incorrect username or password', status: :unauthorized
    end
  end

  def destroy
    user = gon.global.user.username
    session[:user_id] = nil
    gon.global.user = nil
    render plain: "Successfully logged out user: #{user}"
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def session_params
      params.fetch(:session, {})
    end
end
