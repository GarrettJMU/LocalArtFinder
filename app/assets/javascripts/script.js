// document.addEventListener('DOMContentLoaded', function () {
//   if (document.querySelectorAll('#map').length > 0)
//   {
//     if (document.querySelector('html').lang)
//       lang = document.querySelector('html').lang;
//     else
//       lang = 'en';
//
//     var js_file = document.createElement('script');
//     js_file.type = 'text/javascript';
//     js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBw8_a2A3kQG70-XYPjd6jowVpHaj0xasQ&callback=initMap&language=' + lang;
//     document.getElementsByTagName('head')[0].appendChild(js_file);
//   }
// });
//
// var map;
//
// function initMap()
// {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 32.7090852, lng: -117.1576205}, // Map centered on LEARN
//     zoom: 15
//   });
//     fetch('events.json')
//     .then(function(response){return response.json()})
//     .then(plotMarkers);
//   }
//   // Try HTML5 geolocation.
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function(position) {
//     var pos = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude
//     };
//
//     infoWindow.setPosition(pos);
//     infoWindow.setContent('Location found.');
//     infoWindow.open(map);
//     map.setCenter(pos);
//   }, function() {
//     handleLocationError(true, infoWindow, map.getCenter());
//   });
// } else {
//   // Browser doesn't support Geolocation
//   handleLocationError(false, infoWindow, map.getCenter());
// }
//
//
// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
// infoWindow.setPosition(pos);
// infoWindow.setContent(browserHasGeolocation ?
//                       'Error: The Geolocation service failed.' :
//                       'Error: Your browser doesn\'t support geolocation.');
// infoWindow.open(map);
// }
//
// var markers;
// var bounds;
//
//
// function plotMarkers(m)
// {
//   var markers = [];
//   var bounds = new google.maps.LatLngBounds();
//
//
//     m.forEach(function (marker) {
//
//       var position = new google.maps.LatLng(marker.latittude, marker.longitude);
//
//     markers.push(
//       new google.maps.Marker({
//         position: position,
//         map: map,
//         animation: google.maps.Animation.DROP
//       })
//     );
//     bounds.extend(position);
//     });
//
//
//   map.fitBounds(bounds);
// }
//
//
// Other code that did work!!!!!!!!!
//
// <!-- <script>
// document.addEventListener('DOMContentLoaded', function () {
//   if (document.querySelectorAll('#map').length > 0)
//   {
//     if (document.querySelector('html').lang)
//       lang = document.querySelector('html').lang;
//     else
//       lang = 'en';
//
//     var js_file = document.createElement('script');
//     js_file.type = 'text/javascript';
//     js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBw8_a2A3kQG70-XYPjd6jowVpHaj0xasQ&callback=initMap&language=' + lang;
//     document.getElementsByTagName('head')[0].appendChild(js_file);
//   }
// });
//
// var geocoder;
// var map;
// function initialize() {
//     geocoder = new google.maps.Geocoder();
//     bounds = new google.maps.LatLngBounds ();
//     var myOptions = {
//         zoom: 14,
//         mapTypeId: google.maps.MapTypeId.ROADMAP,
//         navigationControlOptions: {
//             style: google.maps.NavigationControlStyle.SMALL
//         }
//     };
//     map = new google.maps.Map(document.getElementById("gmap"), myOptions);
//     geocoder.geocode( { 'address': '30 j st san diego'}, function(results, status) {
//         if (status == google.maps.GeocoderStatus.OK) {
//             map.setCenter(results[0].geometry.location);
//             marker = new google.maps.Marker({
//                 map: map,
//                 position: results[0].geometry.location,
//                 visible: false
//             });
//             bounds.extend(results[0].geometry.location);
//             markersArray.push(marker);
//         }
//         else{
//             alert("Geocode was not successful for the following reason: " + status);
//         }
//     });
//     var markersArray = [];
//     var bounds;
//     var infowindow =  new google.maps.InfoWindow({
//         content: ''
//     });
//     // plot initial point using geocode instead of coordinates (works just fine)
//     plotMarkers();
// }
// var jsonarray;
// $.getJSON('galleries.json', function(json) {
//   jsonarray = json;
// });
// function plotMarkers(){
//   console.log(jsonarray);
//     var i;
//     for(i = 0; i < jsonarray.length; i++){
//         codeAddresses(jsonarray[i].street, jsonarray[i].city, jsonarray[i].state, jsonarray[i].zipcode,  jsonarray[i].id );
//         content += jsonarray[i].street
//     }
// }
// var content = []
// function codeAddresses(street, city,  state, zipcode, id){
//     geocoder.geocode( { 'address': street + city}, function(results, status) {
//         if (status == google.maps.GeocoderStatus.OK) {
//             marker = new google.maps.Marker({
//                 map: map,
//                 position: results[0].geometry.location
//                 // title: markers[0][1]
//             });
//             google.maps.event.addListener(marker, 'mouseover', function() {
//               // for(i = 0; i < jsonarray.length; i++){
//                 infowindow.setContent('<strong>Address:</strong>' + ' ' + street + ', ' + city + ',' + ' ' + state + ',' + ' ' + zip + '<br />' + '<strong>Date:</strong>' + ' ' + date + '<br />' + '<strong>Time:</strong>' + ' ' + time + ' ' + '<br />' +  '<strong>Description:</strong>' + ' ' + description + '<br />' + ' ' + '<a href="' + '../sales/' + id + '">Show</a>' );
//                 infowindow.open(map, this);
//             });
//             bounds.extend(results[0].geometry.location);
//             markersArray.push(marker);
//         }
//         else{
//             alert("Geocode was not successful for the following reason: " + status);
//         }
//         map.fitBounds(bounds);
//     });
// }
// // google.maps.event.addDomListener(window, 'load', initialize);
// </script> -->
