import React, { useEffect, useState } from "react";
import Layout from '@src/layout';
import ReactDOM, { useParams } from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import $ from 'jquery';
import './user.scss';

class UserAccount extends React.Component {

  state = {
    property: {},
  }

  userID = window.location.pathname.replace('/user/', '');

  componentDidMount() {
    fetch(`/api/user/${this.userID}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          property: data.property,

        })
      })

      console.log(this.property)
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
    } = property

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
