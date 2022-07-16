import React, { useEffect, useState } from "react";
import Layout from '@src/layout';
import ReactDOM, { useParams } from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
//import UserProperties from './userPropertiesWidget';
//import UserBookings from './userBookingsWidget';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import { getUserData } from '@utils/requests';
import $ from 'jquery';
import './user.scss';

class UserAccount extends React.Component {

  state = {
    authenticated: false,
    username: undefined,
    showUserProperties: false,
    showUserBookings: false,
  }

  userID = window.location.pathname.replace('/user/', '');

  showProperties = () => {
    window.location.pathname.replace('', 'accountProperties');
  }

  showBookings = () => {
    this.setState({ showUserBookings: true })
  }

  render () {
    const { showUserProperties, showUserBookings } = this.state;

    return (
      <Layout>
      <div className="container pt-4">
        <h4 className="mb-1">Welcome </h4>
        <p className="text-secondary mb-3"></p>
        <div className="text-center">
          <Router>
            <Link to={"/user/" + this.userID + "/accountProperties"}
            onClick={()=>history.push("/user/" + this.userID + "/accountProperties")}>
            <button className="btn btn-light mb-4">show properties</button></Link>
          </Router>


          <button
            className="btn btn-light mb-4"
            onClick={this.showBookings}
          >show bookings</button>
          {showUserBookings && <UserBookings userID={this.userID}/>}
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
