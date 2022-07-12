import React from 'react';
import 'react-dates/initialize';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import $ from 'jquery';
import './user.scss';

class UserProperties extends React.Component {

  state = {
    authenticated: false,
    property: {},
    username: undefined,
    properties: [],
  }

  componentDidMount = () => {
    const that = this;
      fetch('/api/user/' + this.userID)
      .then(handleErrors)
      .then(response => {
        console.log(response.properties)
        console.log(response.bookings)
        //let userProperties = response.properties
        that.setState({
          properties: response.properties,
        })
      })
  }

  render () {
    const { properties, property } = this.state;

    return (
      <div className="container pt-4">
        <h4 className="mb-1">Your Properites!</h4>
        <p className="text-secondary mb-3"></p>
        <div className="text-center">

        </div>
        <div className="row">
          {properties.map(property => {
            return (
              <div key={property.id} className="col-6 col-lg-4 mb-4 property">
                <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                  <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.image_url})` }} />
                  <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                  <h6 className="mb-0">{property.title}</h6>
                  <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                </a>
              </div>
            )
          })}
         </div>
       </div>
    )
  }


}

export default UserProperties
