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
            <h3>Add a Property</h3>
          </div>
            <input name='title' type="text" className="form-control form-control-lg title mb-3" placeholder="Title"/>
            <input name='description' type="text" className="form-control form-control-lgdescription mb-3" placeholder="Description"/>
            <input name='city' type="text" className="form-control form-control-lg city mb-3" placeholder="City"/>
            <input name='country' type="text" className="form-control form-control-lg country mb-3" placeholder="Country"/>
            <input name='property_type' type="text" className="form-control form-control-lg property-type mb-3" placeholder="Property Type"/>
            <input name='price_per_night' type="text" className="form-control form-control-lg price-per-night mb-3" placeholder="Price Per Night"/>
            <input name='max_guests' type="text" className="form-control form-control-lg max-guests mb-3" placeholder="Max Guests"/>
            <input name='bedrooms' type="text" className="form-control form-control-lg bedrooms mb-3" placeholder="Bedrooms"/>
            <input name='beds' type="text" className="form-control form-control-lg beds mb-3" placeholder="Beds"/>
            <input name='baths' type="text" className="form-control form-control-lg baths mb-3" placeholder="Baths"/>
            
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
