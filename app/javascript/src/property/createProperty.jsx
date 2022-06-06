// createProperty.jsx
import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import Layout from '@src/layout';
import BookingWidget from './bookingWidget';
import { handleErrors } from '@utils/fetchHelper';

import './property.scss';

const CreateProperty = () => {

  return (
    <Layout>
      <h1>Add a Property</h1>
    </Layout>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
      <CreateProperty/>,
      document.body.appendChild(document.createElement('div')),
    )
})
