import React, { useEffect, useState } from "react";
import Layout from '@src/layout';
import ReactDOM, { useParams } from 'react-dom';
import UserProperties from './userPropertiesWidget';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import { getUserData } from '@utils/requests';
import $ from 'jquery';
import './user.scss';

class UserAccount extends React.Component {

  state = {
    property: {},
    username: undefined,
    properties: [],
    showUserProperties: false,
  }

  userID = window.location.pathname.replace('/user/', '');

  showProperties = () => {
    this.setState({ showUserProperties: true })
  }

  render () {
    const { showUserProperties } = this.state;

    return (
      <Layout>
      <div className="container pt-4">
        <h4 className="mb-1">Welcome </h4>
        <p className="text-secondary mb-3"></p>
        <div className="text-center">
          <button
            className="btn btn-light mb-4"
            onClick={this.showProperties}
          >show properties</button>
          {showUserProperties && <UserProperties userID={this.userID}/>}
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
