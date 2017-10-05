var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
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
var week;
console.log(">>>end of Variables<<<");

// Fetching the json file for the galleries
$.getJSON('galleries.json', function (json) {
  console.log("Galleries JSON");
  jsonarray = json;
});

// Fetching the json file for the events
$.getJSON('events.json', function (json) {
  console.log("Events JSON");
  eventsJsonArray = json;
});

// Initialization of Google Map
function initMap() {
console.log("initMap");

  // Initializing to the geocoder
  geocoder = new google.maps.Geocoder();

  // Initializing the bounderies of the map
  bounds = new google.maps.LatLngBounds();

  // Creating the Info Window
  infowindow = new google.maps.InfoWindow({
    content: '',
    maxWidth: 200
  });

  // Setting the default coordinates for the map
  var latlng = { lat: 32.7096, lng: -117.1588 };

  // Setting the map options
  var myOptions = {
    zoom: 14,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };

  // Assigning the map to the map <div>
  map = new google.maps.Map(document.getElementById('map'), myOptions);

} // End of initMap

// Clear the map of all markers
function clearMap() {
  for (var a = 0; a < markersArray.length; a++ ) {
    markersArray[a].setMap(null);
  }
  // markersArray.length = 0;
  console.log("Clear Map");
}

// Sends the infos from the JSON file to the geocoder thru the codeAddresses function
function plotMarkers() {
  for (i = 0; i < jsonarray.length; i++) {
    codeAddresses(jsonarray[i].street, jsonarray[i].city, jsonarray[i].state, jsonarray[i].zipcode, jsonarray[i].description, jsonarray[i].id);
  }
}

// Get the 2 digit month from the calendar
function calendarMonth() {
  console.log("Calender Month entered");
  // Pulling the name of the month on the calendar title, comparing it with the monthNames array to get the index and add 1 to have the numerical value of the month
  var calMonth = monthNames.indexOf($('#calendar').fullCalendar('getView').title.split(' ')[0]) + 1;
  console.log(calMonth);
  //
  calMonth = calMonth.toString();
  if (calMonth.length === 1) {
    calMonth = "0" + calMonth;
  }
  return calMonth;
};

// Change Markers if Month view has been clicked on the calendar //
function month() {
  console.log("Month Function Entered");
  clearMap();
  for (i = 0; i < eventsJsonArray.length; i++) {
    // Getting the date from the events json and splitting it
    var eventDate = eventsJsonArray[i].date.split('-');
    // Compare the event month with current month on the calendar
    if (eventDate[1] == calendarMonth()){
      codeAddresses(eventsJsonArray[i].gallery.street, eventsJsonArray[i].gallery.city, eventsJsonArray[i].gallery.state, eventsJsonArray[i].gallery.zipcode, eventsJsonArray[i].gallery.description, eventsJsonArray[i].gallery.id);
    }
  }
};

// Change Markers if week view has been clicked on the calendar //
function week() {
  console.log("Week Function Entered");
  clearMap();
  // Fetching Week information from Fullcalendar
  calWeek = $('#calendar').fullCalendar('getView');

  // Spliting the week title to pull the specific start and end of the week

  //getting the index at position 1 for the first day of the week
  weekTitleStart = calWeek.title.split(' ')[1];

  //Verifying if the day is a two digit day, if not add the zero in front
  if (weekTitleStart.length === 1) {
      var weekDayStart = "0" +  weekTitleStart;
  } else {
      var weekDayStart = weekTitleStart;
  };

  //getting the index at position 3 for the last day of the week
  weekTitleEnd = calWeek.title.split(' ')[3];
  
  //Verifying if the day is a two digit day, if not add the zero in front
  if (weekTitleStart.length === 1) {
      var weekDayEnd = "0" +  weekTitleEnd;
  } else {
      var weekDayEnd = weekTitleEnd;
  };

  // Spliting the event date to match it with the calendar
  for (j = 0; j < eventsJsonArray.length; j++) {
    var eventDate = eventsJsonArray[j].date.split('-');

    // Checking to see if the event date is between the start and the end of the calendar week
    if (eventDate[1] == curentDate.getMonth() + 1 && eventDate[2] >= weekDayStart && eventDate[2] <= weekDayEnd){
      codeAddresses(eventsJsonArray[j].gallery.street, eventsJsonArray[j].gallery.city, eventsJsonArray[j].gallery.state, eventsJsonArray[j].gallery.zipcode, eventsJsonArray[j].gallery.description, eventsJsonArray[j].gallery.id);
    }
  };
}

function codeAddresses(street, city, state, zipcode, description, id) {
  console.log("codeAddresses Entered");
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

$( document ).ready(function() {
  console.log("Doc Ready Begin");

  for (i = 0; i < eventsJsonArray.length; i++) {
    var eventDate = eventsJsonArray[i].date.split('-');
    if (eventDate[1] == curentDate.getMonth() + 1){
      codeAddresses(eventsJsonArray[i].gallery.street, eventsJsonArray[i].gallery.city, eventsJsonArray[i].gallery.state, eventsJsonArray[i].gallery.zipcode, eventsJsonArray[i].gallery.description, eventsJsonArray[i].gallery.id);
    }
  }

  $('.fc-month-button').click(function(){
    console.log("Month Clicked !!");
    month();
  });

  $('.fc-basicWeek-button').click(function(){
    console.log("Week Clicked !!");
    week();
  });
});

// // Clear the map of all markers
// function clearMap() {
//   for (var a = 0; a < markersArray.length; a++ ) {
//     markersArray[a].setMap(null);
//   }
//   markersArray.length = 0;
//   console.log("Clear Map");
// }

// // Sends the infos from the JSON file to the geocoder thru the codeAddresses function
// function plotMarkers() {
//   for (i = 0; i < jsonarray.length; i++) {
//     codeAddresses(jsonarray[i].street, jsonarray[i].city, jsonarray[i].state, jsonarray[i].zipcode, jsonarray[i].description, jsonarray[i].id);
//   }
// }

// // Get the 2 digit month from the calendar
// function calendarMonth() {
//   // Pulling the name of the month on the calendar title, comparing it with the monthNames array to get the index and add 1 to have the numerical value of the month
//   var calMonth = monthNames.indexOf($('#calendar').fullCalendar('getView').title.split(' ')[0]) + 1;
//   console.log(calMonth);
//   //
//   calMonth = calMonth.toString();
//   if (calMonth.length === 1) {
//     calMonth = "0" + calMonth;
//   }
//   return calMonth;
// };

// // Change Markers if Month view has been clicked on the calendar //
// function month() {
//   clearMap();
//   for (i = 0; i < eventsJsonArray.length; i++) {
//     // Getting the date from the events json and splitting it
//     var eventDate = eventsJsonArray[i].date.split('-');
//     // Compare the event month with current month **********Need to make changes for previous and next button************
//     if (eventDate[1] == calendarMonth()){
//       codeAddresses(eventsJsonArray[i].gallery.street, eventsJsonArray[i].gallery.city, eventsJsonArray[i].gallery.state, eventsJsonArray[i].gallery.zipcode, eventsJsonArray[i].gallery.description, eventsJsonArray[i].gallery.id);
//     }
//   }
// }
// Default Month view



// Change Markers if Week view has been clicked on the calendar
//   clearMap();
//
//   // Fetching Week information from Fullcalendar
//   week = $('#calendar').fullCalendar('getView');
//
//   // Spliting the week title to pull the specific start and end of the week
//   weekTitleStart = week.title.split(' ')[1];
//   console.log("type week >>>", typeof weekTitleStart);
//   if (weekTitleStart.length === 1) {
//       var weekDayStart = "0" +  weekTitleStart;
//   } else {
//       var weekDayStart = weekTitleStart;
//   };
//
//   weekTitleEnd = week.title.split(' ')[3];
//   if (weekTitleStart.length === 1) {
//       var weekDayEnd = "0" +  weekTitleEnd;
//   } else {
//       var weekDayEnd = weekTitleEnd;
//   };
//
//   // Spliting the event date to match it with the calendar
//   for (j = 0; j < eventsJsonArray.length; j++) {
//     var eventDate = eventsJsonArray[j].date.split('-');
//
//     // Checking to see if the event date is between the start and the end of the calendar week
//     if (eventDate[1] == curentDate.getMonth() + 1 && eventDate[2] >= weekDayStart && eventDate[2] <= weekDayEnd){
//       codeAddresses(eventsJsonArray[j].gallery.street, eventsJsonArray[j].gallery.city, eventsJsonArray[j].gallery.state, eventsJsonArray[j].gallery.zipcode, eventsJsonArray[j].gallery.description, eventsJsonArray[j].gallery.id);
//     }
//   };
// });

                    // Change Markers if Day view has been clicked on the calendar
                    // $('.fc-basicDay-button').click(function(){
                    //   clearMap();
                    //   console.log('day is clicked');
                    //   console.log($('#calendar').fullCalendar('getView'));
                    // });
                    // for (i = 0; i < eventsJsonArray.length; i++) {
                    //   var eventDate = eventsJsonArray[i].date.split('-');
                    //   if (eventDate[1] == curentDate.getDay()){
                    //     codeAddresses(eventsJsonArray[i].gallery.street, eventsJsonArray[i].gallery.city, eventsJsonArray[i].gallery.state, eventsJsonArray[i].gallery.zipcode, eventsJsonArray[i].gallery.description, eventsJsonArray[i].gallery.id);
                    //   }
                    // }

// });
// function codeAddresses(street, city, state, zipcode, description, id) {
//   console.log("codeAddresses Entered");
//   geocoder.geocode({ 'address': street + city + zipcode }, function (results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       marker = new google.maps.Marker({
//         map: map,
//         position: results[0].geometry.location
//       });
//       google.maps.event.addListener(marker, 'click', function () {
//         infowindow.setContent('<strong>Address:</strong>' + ' ' + street + ', ' + city + ',' + ' ' + state + ',' + ' ' + zipcode + '<br />' +
//         '<strong>Description:</strong>' + ' ' + description + '<br />' + ' ' + '<a href="' + '../galleries/' + id + '">Show</a>');
//         infowindow.open(map, this);
//       });
//
//       bounds.extend(results[0].geometry.location);
//       markersArray.push(marker);
//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//
//     map.fitBounds(bounds);
//   });
// }

// }








// Plot the markers for the event page in relation with the view of the calendar
// function eventPlotMarkers() {
//
// var week = document.getElementsByClassName("fc-basicWeek-button");
