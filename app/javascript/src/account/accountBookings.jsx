import React from 'react';
import ReactDOM, { useParams } from 'react-dom';
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
      fetch('/api/user/' + this.userID)
      .then(handleErrors)
      .then(response => {
        console.log(response.bookings)
        that.setState({
          bookings: response.bookings,
        })
      })
  }

  render () {
    const { bookings, booking } = this.state;

    return (
      <div className="container pt-4">
        <h4 className="mb-1">Your Bookings!</h4>
        <p className="text-secondary mb-3"></p>
        <div className="text-center">

        </div>
        <div className="row">
          {bookings.map(booking => {
            return (
              <ul key={booking.id}>
                <li>{booking.property_id}</li>
                <li>{booking.start_date}</li>
                <li>{booking.end_date}</li>
              </ul>
            )
          })}
         </div>
       </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <UserBookings/>,
    document.body.appendChild(document.createElement('div')),
  )
})
