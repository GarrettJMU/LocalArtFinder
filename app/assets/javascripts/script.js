// document.addEventListener('DOMContentLoaded', function () {
// src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBw8_a2A3kQG70-XYPjd6jowVpHaj0xasQ&callback=initMap&language=';});
// var geocoder;
// var map;
// var markersArray = [];
// var bounds;
// // var infowindow = new google.maps.InfoWindow({content: ''});
// var jsonArray;
//
// $.getJSON('events.json', function(json){jsonArray = json;});
//
// function initialize() {
//   geocoder = new google.maps.Geocoder();
//   bounds = new google.maps.LatLngBounds();
//   var myOptions = {
//     zoom: 14,
//     mapTypeId: google.map.MapTypeId.ROADMAP,
//     navigationControlOptions: {
//       style: google.maps.NavigationControlStyle.SMALL
//     }
//   }
//   map = new google.maps.Map(document.getElementById('map'), myOptions); geocoder.geocode ({'address': '30 j st sandiego'}, function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       map.setCenter(results[0].geometry.location);
//       marker = new google.maps.Marker({
//         map: map,
//         position: results[0].geometry.location,
//         visible: false
//       });
//       bounds.extend(result[0].geometry.location);
//       markersArray.push(marker);
//     }
//     else {
//       alert('Geocode was not Successful for the following reason: ' + status);
//     }
//   });
//   plotMarkers();
// }
// function plotMarkers(){
//   var i;
//   for(i = 0; i < jsonArray.length; i++){
//     codeAddresses(jsonArray[i].gallery.street, jsonArray[i].gallery.city, jsonArray[i].gallery.state, jsonArray[i].gallery.zipcode, jsonArray[i].gallery.id);
//     content += jsonArray[i].gallery.street
//   }
// }
//
// var content = []
//
// function codeAddresses(street, citty, state, zipcode, descrition, id){
//   geocoder.geocode({'adress': street + city + zipcode}, function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       map.setCenter(results[0].geometry.location);
//       marker = new google.maps.Marker({
//       map: map,
//       position: results[0].geometry.location
//       });
//       google.maps.event.addListener(marker, 'mouseover', function() {
//
//       });
//       bounds.extend(results[0].geometry.location);
//       markersArray.push(marker);
//     }
//     else {
//       alert('Geocode was not Successful for the following reason: ' + status);
//     }
//     map.fitBounds(bounds);
//   });
// }
// // google.maps.event.addDomListener(window, 'load', initialize);
