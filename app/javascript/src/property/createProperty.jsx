// createProperty.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import BookingWidget from './bookingWidget';
import { handleErrors } from '@utils/fetchHelper';
import { createProperty } from '@utils/requests';
import $ from 'jquery';
import './property.scss';

const CreateProperty = () => {

  const newProperty = (event) => {
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

  return (
    <Layout>
      <form className="p-2 rounded" onSubmit={newProperty}>
        <div className="new-to-t">
          <h1>Add a Property</h1>
        </div>
        <div className="form-group">
          <input type="text" className="form-control title" placeholder="Title"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control description" placeholder="Description"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control city" placeholder="City"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control country" placeholder="Country"/>
        </div>
        <div className="form-group">
          <input type="text"className="form-control property-type" placeholder="Property Type"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control price-per-night" placeholder="Price Per Night"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control max-guests" placeholder="Max Guests"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control bedrooms" placeholder="Bedrooms"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control beds" placeholder="Beds"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control baths" placeholder="Baths"/>
        </div>

        <label id="upload-image-btn" htmlFor="imageUpload">Upload image</label>
        <img id="image-preview" src="" style={{display: 'none'}} alt="image preview" />
        <input type="file" id="imageUpload" name="image" accept="image/*"></input>

        <button type="submit" id="sign-up-btn" className="btn btn-default btn-warning pull-right">Add Property</button>
      </form>
    </Layout>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
      <CreateProperty/>,
      document.body.appendChild(document.createElement('div')),
    )
})