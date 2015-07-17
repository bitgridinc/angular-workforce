"use strict";

// TODO: Test everything!
function MapController(LeafletService) {
  console.log('Browser support: ', LeafletService.leaflet.esri && LeafletService.leaflet.esri.Support);

  var _this = this
    , utilityHqIcon = LeafletService.createIcon({
        iconUrl: '/images/orange_utility_marker.png',
        iconSize: [32, 32]
      });
  _this.defaults = _this.mapDefaults();

  _this.createUtilityMarker = function(latlng) {
    return LeafletService.createMarker(latlng, {
      icon: utilityHqIcon
    });
  };
  LeafletService.onMap(function(map) {
    _this.initializeMap.bind(_this, map, LeafletService.leaflet)();
  });
}

MapController.prototype.mapDefaults = function() {
  return {
    // Note: This MUST be "" as any other values negatively affect the performance of loading tiles. Don't know why.
    tileLayer: "",
    zoomControl: false,
    attributionControl: false,
    center: {
      lat: 35.885,
      lng: -85.96,
      zoom: 7
    }
  }
};

MapController.prototype.initializeMap = function(map, leaflet) {
  var _this = this
    , utilityHqPointToLayer = function(geojson, latlng) {
        // Creates marker centered over each utility headquarters
        return _this.createUtilityMarker(latlng);
      };

  // see: https://github.com/Leaflet/Leaflet/issues/766
  leaflet.Icon.Default.imagePath = 'bower/leaflet/dist/images';

  leaflet.esri.basemapLayer('Topographic').addTo(map);
  leaflet.esri.featureLayer('http://services5.arcgis.com/yk7EooUDkOKQA9zj/ArcGIS/rest/services/beacons/FeatureServer/0').addTo(map);
  leaflet.esri.featureLayer('http://services5.arcgis.com/yk7EooUDkOKQA9zj/arcgis/rest/services/tn_utilities/FeatureServer/0', {
    pointToLayer: utilityHqPointToLayer
  }).addTo(map);

  // The useCors here requires an explanation. Without it, this request will return no Access-Control-Allow-Origin
  // header. I'm able to GET with my browser or Postman. I do now know why this server does not respond to this
  // request when using CORS, but have a hunch it has to do with how this service is running ArcGIS 10. See the
  // following comment by the creator of esri-leaflet on issue 381 for the hint:
  // "useCors: false // this is probably only needed if the service is on a sever before 10.1"
  // https://github.com/Esri/esri-leaflet/issues/381
  leaflet.esri.dynamicMapLayer('http://maps1.arcgisonline.com/ArcGIS/rest/services/NGA_US_National_Grid/MapServer', {
    opacity: 0.5,
    useCors: false
  }).addTo(map);
};

MapController.$inject = ['LeafletService'];

require('./_module').controller('MapController', MapController);
