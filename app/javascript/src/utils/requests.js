import $ from 'jquery';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  },
  error: function (request, errorMessage) {
    console.log(request, errorMessage);
  }
});

export var createProperty = function (title, description, city, country, property_type, price_per_night, max_guests, bedrooms, beds, baths, image, callback) {
  var fromData = new FormData();
  if (image) {
    formData.append('property[image]', image);
  }
  
  var request = {
    type: 'POST',
    url: 'api/properties',
    data: {
      title: title,
      description: description,
      city: city,
      country: country,
      property_type: property_type,
      price_per_night: price_per_night,
      max_guests: max_guests,
      bedrooms: bedrooms,
      beds: beds,
      baths: baths,
      formData,
    },
    success: function (response) {
      callback(response);
    }
  };
  $.ajax(request);
};
