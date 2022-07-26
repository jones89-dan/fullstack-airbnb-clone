import React, { useEffect, useState } from "react";
import Layout from '@src/layout';
import ReactDOM, { useParams } from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import $ from 'jquery';

class BookingSuccess extends React.Component {

  render () {
    return (
      <Layout>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BookingSuccess/>,
    document.body.appendChild(document.createElement('div')),
  )
})
