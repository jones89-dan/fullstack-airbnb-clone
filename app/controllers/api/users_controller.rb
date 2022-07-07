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

    private

    def user_params
      params.require(:user).permit(:email, :password, :username,)
    end
  end
end
