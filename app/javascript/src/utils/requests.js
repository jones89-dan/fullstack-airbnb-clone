import $ from 'jquery';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  },
  error: function (request, errorMessage) {
    console.log(request, errorMessage);
  }
});

// Create Property
export var createProperty = function (title, description, city, country, property_type, price_per_night, max_guests, bedrooms, beds, baths, image, callback) {
  var formData = new FormData();
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
    },
    formData,
    success: function (response) {
      callback(response);
    }
  };
  $.ajax(request);
};

// Sign out user
export var logOut = function (callback) {
	var request = {
		type: 'DELETE',
		url: 'api/sessions',
		success: function (response) {
			callback(response);
		}
	};
	$.ajax(request);
};

// Authenticate user
export var authenticate = function (callback) {
  var request = {
    type: 'GET',
    url: 'api/authenticated',
    success: function (response) {
      callback(response);
      console.log("logged out")
    }
  };
  $.ajax(request);
};

// Get current username
export var  getCurrentUser = function (callback) {
  authenticate(function (response){
    if (response.authenticated == true) {
      callback(response);
    }
    else if (response.authenticated ==  false) {
      window.location.replace('/');
    }
  });
};
