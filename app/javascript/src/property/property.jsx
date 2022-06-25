// property.jsx
import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Layout from '@src/layout';
import BookingWidget from './bookingWidget';
import { handleErrors } from '@utils/fetchHelper';

import './property.scss';

class Property extends React.Component {
  state = {
    property: {},
    loading: true,
  }

  componentDidMount() {
    fetch(`/api/properties/${this.props.property_id}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          property: data.property,
          loading: false,
        })
      })

      console.log(process.env.STRIPE_PUBLISHABLE_KEY)
  }

  render () {
    const { property, loading } = this.state;
    if (loading) {
      return <p>loading...</p>;
    };

    const propId = this.props.property_id;

    const {
      id,
      title,
      description,
      city,
      country,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds,
      baths,
      image,
      user,
    } = property

    return (
      <Layout>
        <div className="property-image mb-3" style={{ backgroundImage: `asset-url(${image})` }} />
        <div className="container">
          <div className="row">
            <div className="info col-12 col-lg-7">
              <div className="mb-3">
                <h3 className="mb-0">{title}</h3>
                <p className="text-uppercase mb-0 text-secondary"><small>{city}</small></p>
                <p className="mb-0"><small>Hosted by <b>{user.username}</b></small></p>
              </div>
              <div>
                <p className="mb-0 text-capitalize"><b>{property_type}</b></p>
                <p>
                  <span className="me-3">{max_guests} guests</span>
                  <span className="me-3">{bedrooms} bedroom</span>
                  <span className="me-3">{beds} bed</span>
                  <span className="me-3">{baths} bath</span>
                </p>
              </div>
              <hr />
              <p>{description}</p>
            </div>
            <div className="col-12 col-lg-5">
              <BookingWidget property_id={id} price_per_night={price_per_night} />
              <Router>
                <Link to={"/editProperty/" + propId} onClick={()=>history.push("/editProperty/" + id)} params={{ property_id: id }}>Edit</Link>
              </Router>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Property
