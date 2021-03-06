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
export var createProperty = function (title, description, city, country, property_type, price_per_night, max_guests, bedrooms, beds, baths, img, callback) {
  var formData = new FormData();
  formData.set('property[title]', title);
  formData.set('property[description]', description);
  formData.set('property[city]', city);
  formData.set('property[country]', country);
  formData.set('property[property_type]', property_type);
  formData.set('property[price_per_night]', price_per_night);
  formData.set('property[max_guests]', max_guests);
  formData.set('property[bedrooms]', bedrooms);
  formData.set('property[beds]', beds);
  formData.set('property[baths]', baths);
  formData.append('property[image]', img);

  var request = {
    type: 'POST',
    url: 'api/properties',
    cache: false,
    contentType: false,
    processData: false,
    xhrFields: { 'withCredentials': true },
    data:  formData,
    success: function (response) {
      callback(response);
    },
    error: function (request, errorMessage) {
      console.log(request, errorMessage);
    }
  };

  $.ajax(request);
};

// Sign out user
export var logOut = function (callback) {
	var request = {
		type: 'DELETE',
		url: '/api/sessions',
		success: function (response) {
			callback(response);
      console.log("logged out")
		}
	};
	$.ajax(request);
};

// Authenticate user
export var authenticate = function (callback) {
  var request = {
    type: 'GET',
    url: '/api/authenticated',
    success: function (response) {
      callback(response);
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

export var editProperties = function (property_id, callback) {
  var request = {
    type: "PUT",
    url: "/api/properties/" + id,
    success: function (response) {
      if (response.success == true) {
      callback();
      }
    }
  };
  $.ajax(request);
}

export var getUserData = function (userID) {
  var request = {
    type: "GET",
    url: "/api/user/" + userID,
    success: function (response) {
      callback(response);
    }
  };
  $.ajax(request);
};

export var isPaid = function (bookingID) {
  var request = {
    type: "GET",
    url: "/api/" + bookingID + "/paid",
    success: function (response) {
      callback(response);
    }
  };
  $.ajax(request);
};
