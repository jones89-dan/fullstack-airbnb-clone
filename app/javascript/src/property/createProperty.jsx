// createProperty.jsx
import React from 'react';
import Layout from '@src/layout';
import BookingWidget from './bookingWidget';
import { handleErrors } from '@utils/fetchHelper';

import './property.scss';

class CreateProperty extends React.Component {

  render () {

    return (
      <Layout>
      <h1>Add a Property</h1>
      </Layout>
    )

  }
}

export default CreateProperty
