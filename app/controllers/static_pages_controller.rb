class StaticPagesController < ApplicationController
  def home
    render 'home'
  end


  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login
    render 'login'
  end

  def createProperty
    render 'createProperty'
  end

  def editProperty
    render 'editProperty'
  end

  def account
    render 'account'
  end
end
