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
}

export default EditProperty;
