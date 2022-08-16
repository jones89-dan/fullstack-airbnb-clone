import React, { useEffect, useState } from "react";
import Layout from '@src/layout';
import ReactDOM, { useParams } from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import $ from 'jquery';
import './bookingSuccess.scss';

class BookingSuccess extends React.Component {
  state = {
    booking: {},
    property: {},
  }

  pathString = window.location.pathname.replace('/user/', '');
  bookingID = this.pathString.replace(/[^0-9]/g, "");

  componentDidMount = () => {
    const that = this;
    console.log(this.bookingID);
      fetch('/api/booking/' + this.bookingID)
      .then(handleErrors)
      .then(response => {
        console.log(response.booking)
        that.setState({
          booking: response.booking,
          property: response.booking.property,
        })
      })
    }

  render () {
    const { booking, property } = this.state;
  //  const { id, property_id, start_date, end_date, paid} = booking

    return (
      <Layout>
       <div className="container pt-4">
        <h1>Booking Success!</h1>
          <div className="row">
            <div className="col-12 property">
              <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.image_url})` }} />
                <a href={`/property/${property.property_id}`} className="text-body text-decoration-none">
                  <h6 className="m-0">{property.title} <span className="fw-normal">in</span> {property.city}</h6>
                  <p>{property.property_type} hosted by {property.host}</p>
                </a>
                <hr className="my-2"></hr>
                <p className="mb-3">from {booking.start_date} to {booking.end_date}</p>
            </div>
          </div>
        </div>
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
