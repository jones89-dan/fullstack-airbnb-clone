import React, { useEffect, useState } from "react";
import Layout from '@src/layout';
import ReactDOM, { useParams } from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import $ from 'jquery';
import './booking.scss';

class BookingIndex extends React.Component {

}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BookingIndex />,
    document.body.appendChild(document.createElement('div')),
  )
})
