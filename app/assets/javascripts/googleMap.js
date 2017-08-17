var markersArray = [];
var content = [];
var geocoder;
var map;
var bounds;
var infowindow;
var marker;
var jsonarray;

// Getting the json file to build the plot markers
$.getJSON('galleries.json', function (json) { jsonarray = json; });

// Initialization of Google Map

function initMap() {
 // Initializing to the geocoder
 geocoder = new google.maps.Geocoder();

 // Initializing the bounderies of the map
 bounds = new google.maps.LatLngBounds();

 infowindow = new google.maps.InfoWindow({
   content: '',
   maxWidth: 200
 });

 // Setting the default coordinates for the map
 var latlng = { lat: 32.7096, lng: -117.1588 };

 var myOptions = {
   zoom: 14,
   center: latlng,
   mapTypeId: google.maps.MapTypeId.TERRAIN
 };

 map = new google.maps.Map(document.getElementById('map'), myOptions);

 plotMarkers();
}

function plotMarkers() {
 for (i = 0; i < jsonarray.length; i++) {
   codeAddresses(jsonarray[i].street, jsonarray[i].city, jsonarray[i].state, jsonarray[i].zipcode, jsonarray[i].description, jsonarray[i].id);
 }
}

function codeAddresses(street, city, state, zipcode, description, id) {
 geocoder.geocode({ 'address': street + city + zipcode }, function (results, status) {
   if (status == google.maps.GeocoderStatus.OK) {
     marker = new google.maps.Marker({
       map: map,
       position: results[0].geometry.location
     });
     google.maps.event.addListener(marker, 'mouseover', function () {
       infowindow.setContent('<strong>Address:</strong>' + ' ' + street + ', ' + city + ',' + ' ' + state + ',' + ' ' + zipcode + '<br />' + '<strong>Description:</strong>' + ' ' + description + '<br />' + ' ' + '<a href="' + '../galleries/' + id + '">Show</a>');
       infowindow.open(map, this);
     });

     bounds.extend(results[0].geometry.location);
     markersArray.push(marker);
   } else {
     alert('Geocode was not successful for the following reason: ' + status);
   }

   map.fitBounds(bounds);
 });
}
