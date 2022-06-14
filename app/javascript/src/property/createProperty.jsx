// createProperty.jsx
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import BookingWidget from './bookingWidget';
import { createProperty } from '@utils/requests';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import $ from 'jquery';
import './property.scss';

class CreateProperty extends React.Component {

state = {
  property: {}
}

handleChange = (error) => {
        this.setState({
            [error.target.name]: error.target.value,
        })
    }

/*
  newProperty = (event) => {
    event.preventDefault();
    var title = $('.title').val();
    var description = $('.description').val();
    var city = $('.city').val();
    var country = $('.country').val();
    var propertyType = $('.property-type').val();
    var pricePerNight = $('.price-per-night').val();
    var maxGuests = $('.max-guests').val();
    var bedrooms = $('.bedrooms').val();
    var beds = $('.beds').val();
    var baths = $('.baths').val();
    var imageUpload = document.getElementById('imageUpload');
    var img = imageUpload.files[0];

    createProperty(title, description, city, country, propertyType, pricePerNight, maxGuests, bedrooms, beds, baths, img, function (response) {
      if (response.success == false) {
        console.log("Ooops, something went wrong");
      }
      else {
        console.log("Property added successfully!");
      }
    });
  }
*/

  createBooking = (event) => {
      event.preventDefualt();
      let formData = new FormData();
      formData.set('property[images]', this.state.image_url);
      formData.set('property[title]', this.state.title);
      formData.set('property[city]', this.state.description);
      formData.set('property[title]', this.state.country);
      formData.set('property[city]', this.state.property_type);
      formData.set('property[title]', this.state.price_per_night);
      formData.set('property[city]', this.state.max_guests);
      formData.set('property[city]', this.state.bedrooms);
      formData.set('property[city]', this.state.beds);
      formData.set('property[city]', this.state.baths);

        fetch('/api/properties', safeCredentials({
            method: 'POST',
            body: formData,
        }))

    }

  render () {

    const { property } = this.state;
    const { id, title, description, city, country, property_type, price_per_night, max_guests, bedrooms, beds, baths, image_url, user} = property;

    return (
      <Layout>
        <form className="p-2 rounded" onSubmit={this.createBooking}>
          <div className="new-to-t">
            <h1>Add a Property</h1>
          </div>
          <div className="form-group">
            <input type="text" className="form-control title" placeholder="Title" value={title} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <input type="text" className="form-control description" placeholder="Description" value={description} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <input type="text" className="form-control city" placeholder="City" value={city} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <input type="text" className="form-control country" placeholder="Country" value={country} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <input type="text"className="form-control property-type" placeholder="Property Type" value={property_type} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <input type="text" className="form-control price-per-night" placeholder="Price Per Night" value={price_per_night} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <input type="text" className="form-control max-guests" placeholder="Max Guests" value={max_guests} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <input type="text" className="form-control bedrooms" placeholder="Bedrooms" value={bedrooms} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <input type="text" className="form-control beds" placeholder="Beds" value={beds} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <input type="text" className="form-control baths" placeholder="Baths" value={baths} onChange={this.handleChange}/>
          </div>

          <label id="upload-image-btn" htmlFor="imageUpload">Upload image</label>
          <img id="image-preview" src="" style={{display: 'none'}} alt="image preview" />
          <input type="file" id="imageUpload" name="image" accept="image/*" value={image_url} onChange={this.handleChange}/>

          <button type="submit" id="sign-up-btn" className="btn btn-default btn-warning pull-right">Add Property</button>
        </form>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <CreateProperty />,
    document.body.appendChild(document.createElement('div')),
  )
})
