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
      getUserData(this.userID, function (response) {
        if (response.success == false) {
          console.log("Ooops, something went wrong");
        }
        else {
          //console.log(this.userID);
          console.log(response);
          //let properties = response.data.property;
          //this.setState({ properties: properties })
        }
      });
  }

  render () {
    const { property } = this.state;

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
      <Layout></Layout>
    )
  }

}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <UserAccount/>,
    document.body.appendChild(document.createElement('div')),
  )
})
