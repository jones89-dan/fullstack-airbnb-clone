import React, { useEffect, useState } from "react";
import Layout from '@src/layout';
import ReactDOM, { useParams } from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import $ from 'jquery';
import './user.scss';

class UserAccount extends React.Component {

  //userID = window.location.pathname.replace('/api/', '');

  componentDidMount() {
    //fetch(`/api/user/${this.userID}`)
  }

  render () {

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
