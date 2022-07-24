module Api
  class PropertiesController < ApplicationController

    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@properties

      render 'api/properties/index', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@property

      render 'api/properties/show', status: :ok
    end

    def create
            token = cookies.signed[:airbnb_session_token]
            session = Session.find_by(token: token)
            if session
                user = session.user
                @property = user.properties.new(property_params)
                if @property.save
                    render 'api/properties/create'
                else
                    render json: { success: false }
                end
            else
                render json: { success: false }
            end
        end

        def edit
          token = cookies.signed[:airbnb_session_token]
          session = Session.find_by(token: token)
          user = session.user
          @property = Property.find_by(id: params[:id])
          @property.update!(property_params)
          render 'api/properties/show'
        end

        def get_property
          property = Property.find_by(id: params[:id])
          return render json: { error: 'cannot find property' }, status: :not_found if !property
        end

        def getUserProperties
          token = cookies.signed[:airbnb_session_token]
          session = Session.find_by(token: token)

          if session
            @user = session.user
            id = @user.id
          end
          @properties = Property.where(user_id: id)

          render 'api/accounts/indexAccountProperties'
        end

    private
       def property_params
           params.require(:property).permit(:title, :description, :city, :country, :property_type, :price_per_night, :max_guests, :bedrooms, :beds, :baths, :image_url)
       end

  end
end
