"use strict";

require('./_module_init.js')
  .service('geocoder',
    function($http) {
      return {
        geocodeAddress: function(street, city, onResponseCallback) {
          street = street.replace(/ /g, '+');
          city = city.replace(' ', '+');
          var queryUrl = 'http://nominatim.openstreetmap.org/search?q=' + street + '+' + city +'&addressdetails=1&format=json';
          console.log('Calling Nominatim for a geocode request: ', queryUrl);
          return $http.get(queryUrl)
            .success(function(data) {
              console.log('Nominatim returned: ', data);
              var geocodedAddress = {
                lat: Number(data[0].lat),
                lng: Number(data[0].lon),
                streetAddress: data[0].address.house_number + ' ' + data[0].address.road
              };
              console.log('Passing callback the geocoded address: ', geocodedAddress);
              onResponseCallback(geocodedAddress);
            });
        }
      }
    }
  );
