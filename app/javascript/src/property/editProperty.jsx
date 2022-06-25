import React, { useEffect, useState } from "react";
import Layout from '@src/layout';
import ReactDOM, { useParams } from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import { editProperties } from '@utils/requests';
import $ from 'jquery';
import './property.scss';

class EditProperty extends React.Component {
   state = {
        property: {},
    }

   propertyID = window.location.pathname.replace('/editProperty', '');

   handleChange = (event) => {
          this.setState({
            [e.target.name]: e.target.value,
          })
        }

        componentDidMount() {
          fetch(`/api/properties/${this.propertyID}`)
            .then(handleErrors)
            .then(data => {
              this.setState({
                property: data.property,
                loading: false,
              })
            })
        }

  editExistingProperty = (e) => {
        if (e) { e.preventDefault(); }
        fetch(`/api/editProperty/${propertyID}`, safeCredentials({
            method: 'PUT',
            body: JSON.stringify({
                property: {
                    title: this.state.title,
                    description: this.state.description,
                    city: this.state.city,
                    country: this.state.country,
                    property_type: this.state.property_type,
                    price_per_night: this.state.price_per_night,
                    max_guests: this.state.max_guests,
                    bedrooms: this.state.bedrooms,
                    beds: this.state.beds,
                    baths: this.state.baths,
                    image: this.state.image,
                }
            })
        }))
            .then(handleErrors)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render () {

      const { property } = this.state;

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
          <h3>Make changes to your property</h3>
            <form onSubmit={this.editExistingProperty}>
              <input name='title' className="form-control form-control-lg mb-3" type='text' placeholder={title} value={title} onChange={this.handleChange} required />
              <input name='description' className="form-control form-control-lg mb-3" type='text' placeholder={description} value={description} onChange={this.handleChange} required />
              <input name='city' className="form-control form-control-lg mb-3" type='text' placeholder={city} value={city} onChange={this.handleChange} required />
              <input name='country' className="form-control form-control-lg mb-3" type='text' placeholder={country} value={country} onChange={this.handleChange} required />
              <input name='property_type' className="form-control form-control-lg mb-3" type='text' placeholder={property_type} value={property_type} onChange={this.handleChange} required />
              <input name='price_per_night' className="form-control form-control-lg mb-3" type='number' placeholder={price_per_night} value={price_per_night} onChange={this.handleChange} required />
              <input name='max_guests' className="form-control form-control-lg mb-3" type='number' placeholder={max_guests} value={max_guests} onChange={this.handleChange} required />
              <input name='bedrooms' className="form-control form-control-lg mb-3" type='number' placeholder={bedrooms} value={bedrooms} onChange={this.handleChange} required />
              <input name='beds' className="form-control form-control-lg mb-3" type='number' placeholder={beds} value={beds} onChange={this.handleChange} required />
              <input name='baths' className="form-control form-control-lg mb-3" type='number' placeholder={baths} value={baths} onChange={this.handleChange} required />
              <input name='image_url' className="form-control form-control-lg mb-3" type='text' placeholder={image} value={image} onChange={this.handleChange} required />
              <button type="submit" className="btn btn-danger btn-block btn-lg">Update!</button>
            </form>
          </Layout>
      )
    }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <EditProperty />,
    document.body.appendChild(document.createElement('div')),
  )
})
