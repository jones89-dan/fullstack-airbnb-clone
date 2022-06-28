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

   handleChange = (e) => {
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

    setAttributes = (property) => {
    for (let attribute in property) {
      this.setState({ [attribute]: property[attribute] })
    }
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

    updateProperty = (event) => {
        event.preventDefualt();
        let formData = new FormData();
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
        formData.append('property[image_url]', this.state.image_url);

          fetch(`/api/editProperty/${propertyID}`, safeCredentials({
              method: 'PATCH',
              body: formData,
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
      } = property;

      return (
        <Layout>
          <h3>Make changes to your property</h3>
            <form onSubmit={this.updateProperty}>
              <input name='title' className="form-control form-control-lg mb-3" type='text' placeholder={title} value={this.state.title || ""} onChange={this.handleChange}  />
              <input name='description' className="form-control form-control-lg mb-3" type='text' placeholder={description} value={this.state.description || ""} onChange={this.handleChange}  />
              <input name='city' className="form-control form-control-lg mb-3" type='text' placeholder={city} value={this.state.city || ""} onChange={this.handleChange}  />
              <input name='country' className="form-control form-control-lg mb-3" type='text' placeholder={country} value={this.state.country || ""} onChange={this.handleChange}  />
              <input name='property_type' className="form-control form-control-lg mb-3" type='text' placeholder={property_type} value={this.state.property_type || ""} onChange={this.handleChange}  />
              <input name='price_per_night' className="form-control form-control-lg mb-3" type='number' placeholder={price_per_night} value={this.state.price_per_night || ""} onChange={this.handleChange}  />
              <input name='max_guests' className="form-control form-control-lg mb-3" type='number' placeholder={max_guests} value={this.state.max_guests || ""} onChange={this.handleChange}  />
              <input name='bedrooms' className="form-control form-control-lg mb-3" type='number' placeholder={bedrooms} value={this.state.bedrooms || ""} onChange={this.handleChange}  />
              <input name='beds' className="form-control form-control-lg mb-3" type='number' placeholder={beds} value={this.state.beds || ""} onChange={this.handleChange}  />
              <input name='baths' className="form-control form-control-lg mb-3" type='number' placeholder={baths} value={this.state.baths || ""} onChange={this.handleChange}  />

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
