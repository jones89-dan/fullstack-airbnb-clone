// createProperty.jsx
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { createProperty } from '@utils/requests';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import $ from 'jquery';
import './property.scss';

const CreateProperty = () => {

  const [imagePreview, setImagePreview] = useState("");

  const handleImage = function (event) {
    var source = URL.createObjectURL(event.target.files[0]);
    setImagePreview(source);
  };

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
        console.log(response.error);
      }
      else {
        console.log("Property added successfully!");
        alert("Property added successfully!");
        window.location.replace("./");

      }
    });
  }

  const createBooking = (event) => {
      event.preventDefualt();
      let formData = new FormData();
      formData.append('property[image_url]', this.state.image_url);
      formData.append('property[title]', this.state.title);
      formData.append('property[description]', this.state.description);
      formData.append('property[city]', this.state.city);
      formData.append('property[country]', this.state.country);
      formData.append('property[property_type]', this.state.property_type);
      formData.append('property[price_per_night]', this.state.price_per_night);
      formData.append('property[max_guests]', this.state.max_guests);
      formData.append('property[bedrooms]', this.state.bedrooms);
      formData.append('property[beds]', this.state.beds);
      formData.append('property[baths]', this.state.baths);

        fetch('/api/properties', safeCredentials({
            method: 'POST',
            body: formData,
        }))
    }

  return (
    <Layout>
     <div className="container pt-4">
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
          <img id="image-preview" src="" style={{display: 'none'}} alt="image preview"/>
          <input type="file" id="imageUpload" name="image" accept="image/*" onChange={handleImage}></input>

          <button type="submit" id="sign-up-btn" className="btn btn-large btn-danger btn-block">Add Property</button>
        </form>
      </div>
    </Layout>

  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <CreateProperty />,
    document.body.appendChild(document.createElement('div')),
  )
})
