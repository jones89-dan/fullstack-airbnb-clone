import React, { useEffect, useState } from "react";
import Layout from '@src/layout';
import ReactDOM, { useParams } from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import { getUserData } from '@utils/requests';
import $ from 'jquery';
import './user.scss';

class UserAccount extends React.Component {

  state = {
    property: {},
    username: undefined,
    properties: [],
  }

  userID = window.location.pathname.replace('/user/', '');

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

  showProperties = function (evnet) {


  }

  render () {
    const { properties, property } = this.state;

    

    return (
      <Layout>
      <div className="container pt-4">
        <h4 className="mb-1">Top-rated places to stay</h4>
        <p className="text-secondary mb-3">Explore some of the best-reviewed stays in the world</p>
        <div className="text-center">
          <button
            className="btn btn-light mb-4"
            onClick={this.showProperties}
          >show</button>
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
      </Layout>
    )
  }

}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <UserAccount/>,
    document.body.appendChild(document.createElement('div')),
  )
})
