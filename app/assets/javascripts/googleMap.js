var markersArray = [];
var content = [];
var eventsJsonArray = [];
var jsonarray = [];
var curentDate = new Date()
var geocoder;
var map;
var bounds;
var infowindow;
var marker;


console.log("Path Name>>>", window.location.pathname === '/events'); // Good check for path

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

  $.getJSON('galleries.json', function (json) {
    jsonarray = json;
    console.log("JSON>>>", jsonarray);
    if ( window.location.pathname != '/events') {
      plotMarkers();
    }
  });

  $.getJSON('events.json', function (json) {
    eventsJsonArray = json;
    console.log("JSON2>>>", eventsJsonArray)
    if (window.location.pathname === '/events') {
      eventPlotMarkers()
    }
  });

}

function plotMarkers() {
  for (i = 0; i < jsonarray.length; i++) {
    codeAddresses(jsonarray[i].street, jsonarray[i].city, jsonarray[i].state, jsonarray[i].zipcode, jsonarray[i].description, jsonarray[i].id);
  }
}

function eventPlotMarkers() {
  $( document ).ready(function() {
      // Change Markers if Month view has been clicked on the calendar
      $('.fc-month-button').click(function(){
        console.log('month is clicked');
        for (i = 0; i < eventsJsonArray.length; i++) {
          var eventDate = eventsJsonArray[i].date.split('-');
          if (eventDate[1] == curentDate.getMonth() + 1){
            codeAddresses(eventsJsonArray[i].gallery.street, eventsJsonArray[i].gallery.city, eventsJsonArray[i].gallery.state, eventsJsonArray[i].gallery.zipcode, eventsJsonArray[i].gallery.description, eventsJsonArray[i].gallery.id);
          }
        }
      });

      // Change Markers if Week view has been clicked on the calendar
      $('.fc-basicWeek-button').click(function(){
        console.log('week is clicked');
        var week = $('#calendar').fullCalendar('getView');
        console.log("week range>>>", week.title);
        for (i = 0; j < eventsJsonArray.length; j++) {
          var eventDate = eventsJsonArray[i].date.split('-');
          if (eventDate[1] == curentDate.getMonth() + 1){
            codeAddresses(eventsJsonArray[j].gallery.street, eventsJsonArray[j].gallery.city, eventsJsonArray[j].gallery.state, eventsJsonArray[j].gallery.zipcode, eventsJsonArray[j].gallery.description, eventsJsonArray[j].gallery.id);
          }
        }
      });

      // Change Markers if Day view has been clicked on the calendar
      $('.fc-basicDay-button').click(function(){
        console.log('day is clicked');
      });
      for (i = 0; i < eventsJsonArray.length; i++) {
        var eventDate = eventsJsonArray[i].date.split('-');
        if (eventDate[1] == curentDate.getMonth() + 1){
          codeAddresses(eventsJsonArray[i].gallery.street, eventsJsonArray[i].gallery.city, eventsJsonArray[i].gallery.state, eventsJsonArray[i].gallery.zipcode, eventsJsonArray[i].gallery.description, eventsJsonArray[i].gallery.id);
        }
      }

  });

}

var week = document.getElementsByClassName("fc-basicWeek-button");
console.log("week>>",week);

function codeAddresses(street, city, state, zipcode, description, id) {
  geocoder.geocode({ 'address': street + city + zipcode }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
      google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent('<strong>Address:</strong>' + ' ' + street + ', ' + city + ',' + ' ' + state + ',' + ' ' + zipcode + '<br />' +
                                '<strong>Description:</strong>' + ' ' + description + '<br />' + ' ' + '<a href="' + '../galleries/' + id + '">Show</a>');
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
