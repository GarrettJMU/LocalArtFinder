document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('#map').length > 0)
  {
    if (document.querySelector('html').lang)
      lang = document.querySelector('html').lang;
    else
      lang = 'en';

    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBw8_a2A3kQG70-XYPjd6jowVpHaj0xasQ&callback=initMap&language=' + lang;
    document.getElementsByTagName('head')[0].appendChild(js_file);
  }
});
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.7090852, lng: -117.1576205}, // Map centered on LEARN
    zoom: 15
  });
  // Try HTML5 geolocation.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);
    map.setCenter(pos);
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });
} else {
  // Browser doesn't support Geolocation
  handleLocationError(false, infoWindow, map.getCenter());
}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
                      'Error: The Geolocation service failed.' :
                      'Error: Your browser doesn\'t support geolocation.');
infoWindow.open(map);
}


//   fetch('/events.json')
//   .then(function(response){return response.json()})
//   .then(plotMarkers);
// }
//
//
// function plotMarkers(m)
// {
//   var markers = [];
//   var bounds = new google.maps.LatLngBounds();
//
//
//     m.forEach(function (marker) {
//     var position = new google.maps.LatLng(marker.latittude, marker.longitude);
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


  map.fitBounds(bounds);
