"use strict";

require('./_module_init.js')
  .service('geocoder',
    function($http) {
      return {
        geocodeAddress: function(street, city) {
          street = street.replace(/ /g, '+');
          city = city.replace(' ', '+');
          var queryUrl = 'http://nominatim.openstreetmap.org/search?q=' + street + '+' + city +'&format=json';
          console.log('Calling Nominatim for a geocode request: ', queryUrl);
          return $http.get(queryUrl)
            .then(function(data) {
              console.log(data.data);
              return {
                lat: Number(data.data[0].lat),
                lng: Number(data.data[0].lon)
              }
            });
        }
      }
    }
  );
