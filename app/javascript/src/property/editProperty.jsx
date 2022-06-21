import React from "react";
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import { editProperties } from '@utils/requests';

class EditProperty extends React.Component {
  state = {
        property: {},
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    editExistingProperty = (e) => {
        if (e) { e.preventDefault(); }
        fetch(`/api/properties/${this.props.property_id}`, safeCredentials({
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

    }

}

export default EditProperty;
