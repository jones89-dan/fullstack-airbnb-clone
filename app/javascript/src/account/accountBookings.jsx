import React from 'react';
import ReactDOM, { useParams } from 'react-dom';
import Layout from '@src/layout';
import 'react-dates/initialize';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import $ from 'jquery';
import './user.scss';

class UserBookings extends React.Component {
  state = {
    authenticated: false,
    username: undefined,
    booking: {},
    bookings: [],
    property: {},
  }

  componentDidMount = () => {
    const that = this;
      fetch('/api/user/' + this.userID + '/accountBookings')
      .then(handleErrors)
      .then(response => {
        console.log(response.bookings)
        that.setState({
          bookings: response.bookings,
        })
      })
  }

  initiateStripeCheckout = (booking_id) => {
    return fetch(`/api/charges?booking_id=${booking_id}&cancel_url=${window.location.pathname}`, safeCredentials({
      method: 'POST',
    }))
    .then(handleErrors)
    .then(response => {
      const stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY);

      stripe.redirectToCheckout({
        sessionId: response.charge.checkout_session_id,
      }).then((result) => {
        console.log('result error', result.error.message);
      });
    })
    .catch(error => {
      console.log(error);
    })
  }

  completeBooking = (e) => {
    e.preventDefault();
    this.initiateStripeCheckout(e.target.value);
  }


  render () {
    const { bookings, booking, property } = this.state;

    return (
      <Layout>
        <div className="container pt-4">
          <h4 className="mb-1">Your Bookings!</h4>
          <p className="text-secondary mb-3"></p>
          <div className="row">
            {bookings.map(booking => {
              return (
                <div key={booking.id} className="row my-4 justify-content-center">
                  <div className="col-9 gx-0 property-booking my-1">
                   <div className="d-flex justify-content-between">
                     <div className="p-4 ps-5">
                       <a href={`/property/${booking.property_id}`} className="text-body text-decoration-none">
                         <h6 className="m-0">{booking.property.title} <span className="fw-normal">in</span> {booking.property.city}</h6>
                         <small>{booking.property.property_type} hosted by {booking.property.host}</small>
                       </a>
                       <hr className="my-2"></hr>
                       <small className="mb-3">from {booking.start_date} to {booking.end_date}</small>
                        {booking.paid ?
                        <button className="btn btn-success btn-sm ms-5 px-5">paid</button>
                         :
                        <button className="btn btn-danger btn-sm m-5" value={booking.id} onClick={this.completeBooking}>complete checkout</button>}
                     </div>
                   </div>
                 </div>
                </div>
                )
              })}
           </div>
         </div>
       </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <UserBookings/>,
    document.body.appendChild(document.createElement('div')),
  )
})
