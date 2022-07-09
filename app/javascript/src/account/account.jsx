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


  componentDidMount() {
      fetch('/api/user/' + this.userID)
      .then(handleErrors)
      .then(data => {
        console.log(data)
        let userProperties = data.user.properties
        this.setState({
          properties: userProperties,
        })
      })
     //console.log(this.properties)
  }

  showProperties = function (evnet) {

    //console.log(data.properties)
  }

  render () {
    const { properties, property } = this.state;

    const {
      id,
      title,
      description,
      city,
      country,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds,
      baths,
      image,
      user,
    } = property;

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
