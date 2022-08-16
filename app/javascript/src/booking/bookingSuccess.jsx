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
        <div className="row my-4 justify-content-center">
          <div className="col-9 gx-0 property-booking my-1">
           <div className="d-flex justify-content-between">
             <div className="p-4 ps-5">
              <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.image_url})` }} />
               <a href={`/property/${property.property_id}`} className="text-body text-decoration-none">
                 <h6 className="m-0">{property.title} <span className="fw-normal">in</span> {booking.city}</h6>
                 <small>{property.property_type} hosted by {property.host}</small>
               </a>
               <hr className="my-2"></hr>
               <small className="mb-3">from {booking.start_date} to {booking.end_date}</small>
             </div>
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
