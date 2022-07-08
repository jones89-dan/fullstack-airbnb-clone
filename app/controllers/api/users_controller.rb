module Api
  class UsersController < ApplicationController
    def create
    @user = User.new(user_params)

      if @user.save
        render 'api/users/create'
      else
        render json: { success: false }, status: :bad_request
      end
    end

    def userDetails
      @user = User.find(params[:id])
      render json: @user, id: params[:id]
    end

    def getUserData
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      if session
        @user = session.user
        id = @user.id
      end
      @properties = Property.where(user_id: id)
      @bookings = Booking.where(user_id: id)
      render 'api/accounts/indexAccount'
    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :username,)
    end
  end
end
