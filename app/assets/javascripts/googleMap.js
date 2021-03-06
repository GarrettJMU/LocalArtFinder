var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
var monthShortNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
var markersArray = [];
var content = [];
var eventsJsonArray = [];
var galleryJsonArray = [];
var curentDate = new Date()
var geocoder;
var map;
var bounds;
var infowindow;
var marker;
var calYear;
var week;
var calShortMonthStart;
var calShortMonthEnd;
var calWeek;
var weekDayStart;
var weekDayEnd;

// Fetching the json file for the galleries
function retrieveGalleryJson() {
  $.getJSON('galleries.json', function (json) {
    galleryJsonArray = json;
    initMap(json);
  });
}

// Fetching the json file for the events
function retrieveEventJson() {
  $.getJSON('events.json', function (json) {
    eventsJsonArray = json;
    initMap(json.reduce((addressArray, event) => {return [...addressArray, event.gallery]}, []));
  });
}

// Initialization of Google Map
function initMap(jsonArray) {
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

  plotMarkers(jsonArray);
} // End of initMap

// Clear the map of all markers
function clearMap() {
  for (var a = 0; a < markersArray.length; a++ ) {
    markersArray[a].setMap(null);
  };
};

// Sends the infos from the JSON file to the geocoder thru the codeAddresses function
function plotMarkers(jsonArray) {
  for (var i = 0; i < jsonArray.length; i++) {
    codeAddresses(jsonArray[i].street, jsonArray[i].city, jsonArray[i].state, jsonArray[i].zipcode, jsonArray[i].description, jsonArray[i].id);
  };
};

// Get the 2 digit month from the calendar
function calendarMonth() {

  // Pulling the name of the month on the calendar title, comparing it with the monthNames array to get the index and add 1 to have the numerical value of the month
  var calMonth = monthNames.indexOf($('#calendar').fullCalendar('getView').title.split(' ')[0]) + 1;
  calMonth = calMonth.toString();
  if (calMonth.length === 1) {
    calMonth = "0" + calMonth;
  };
  return calMonth;
};

// Pulling the name of the three letter month on the calendar title, comparing it with the monthShortNames array to get the index and add 1 to have the numerical value of the month
function calendarShortMonth() {
  calShortMonthStart = monthShortNames.indexOf($('#calendar').fullCalendar('getView').title.split(' ')[0]) + 1;
  calShortMonthStart = calShortMonthStart.toString();

  // Checking if it is a two digit month if not, add the zero in front
  if (calShortMonthStart.length === 1) {
    calShortMonthStart = "0" + calShortMonthStart;
  };

  // Checking to see if it is a split week and get the second month information
  if ($('#calendar').fullCalendar('getView').title.split(' ').length === 6) {
    calShortMonthEnd = monthShortNames.indexOf($('#calendar').fullCalendar('getView').title.split(' ')[3]) + 1;
    calShortMonthEnd = calShortMonthEnd.toString();

    // Checking if it is a two digit month if not, add the zero in front
    if (calShortMonthEnd.length === 1) {
      calShortMonthEnd = "0" + calShortMonthEnd;
    };
  };
};

function calendarWeek() {
  // Fetching Week information from Fullcalendar
  calWeek = $('#calendar').fullCalendar('getView');

  //getting the index at position 1 for the first day of the week
  weekTitleStart = calWeek.title.split(' ')[1];

  //Verifying if the day is a two digit day, if not add the zero in front
  if (weekTitleStart.length === 1) {
      weekDayStart = "0" +  weekTitleStart;
  } else {
      weekDayStart = weekTitleStart;
  };

  // Spliting the week title to pull the specific start and end of the week if it is a split week
  if ($('#calendar').fullCalendar('getView').title.length == 20) {
    weekTitleEnd = calWeek.title.split(' ')[4].split(',')[0];
  } else {
    weekTitleEnd = calWeek.title.split(' ')[3].split(',')[0];
  };

  //Verifying if the day is a two digit day, if not add the zero in front
  if (weekTitleEnd.length === 1) {
      weekDayEnd = "0" +  weekTitleEnd;
  } else {
      weekDayEnd = weekTitleEnd;
  };
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          MONTH FUNCTION                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Change Markers if Month view has been clicked on the calendar //
function month() {
  // Clear the Map of all markers
  clearMap();

  // Going thru the eventsJsonArray to see if any of the events are in the displayed month  r4ew
  for (var i = 0; i < eventsJsonArray.length; i++) {
    if (!eventsJsonArray[i].date) { continue }
    // Getting the date from the events json and splitting it
    var eventDate = eventsJsonArray[i].date.split('-');
    // Compare the event month, year with current month, year on the calendar
    calYear = $('#calendar').fullCalendar('getView').title.split(' ')[1];
    if (eventDate[1] == calendarMonth() && eventDate[0] == calYear){
      codeAddresses(eventsJsonArray[i].gallery.street, eventsJsonArray[i].gallery.city, eventsJsonArray[i].gallery.state, eventsJsonArray[i].gallery.zipcode, eventsJsonArray[i].gallery.description, eventsJsonArray[i].gallery.id);
    };
  };
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          WEEK FUNCTION                                                                         //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Change Markers if week view has been clicked on the calendar //
function week() {

  // Clear the Map of all markers
  clearMap();

  // Getting the displayed Year info
  calYear = $('#calendar').fullCalendar('getView').title.split(' ')[1];

  // Getting the displayed Week info
  calendarWeek();

  // Getting the short month info
  calendarShortMonth();

  // Checking the week display to see if it is a split week (a week with 2 different months)
  if (calWeek.title.length == 20){
    calYear = $('#calendar').fullCalendar('getView').title.split(' ')[5];
    for (var j = 0; j < eventsJsonArray.length; j++) {
      if (!eventsJsonArray[j].date) { continue }
      // Spliting the event date to match it with the calendar
      var eventDate = eventsJsonArray[j].date.split('-');
      // CHECK FOR THE VALIDITY OF THE DATE (START MONTH, START DATE, END MONTH, END DATE)
      if ((calShortMonthStart == eventDate[1] && 31 >= eventDate[2] >= weekDayStart) || (calShortMonthEnd == eventDate[1] && 1 <= eventDate[2] <= weekDayEnd) && eventDate[0] == calYear) {
        codeAddresses(eventsJsonArray[j].gallery.street, eventsJsonArray[j].gallery.city, eventsJsonArray[j].gallery.state, eventsJsonArray[j].gallery.zipcode, eventsJsonArray[j].gallery.description, eventsJsonArray[j].gallery.id);
      };
    };
  } else {
    calYear = $('#calendar').fullCalendar('getView').title.split(' ')[4];
    for (var h = 0; h < eventsJsonArray.length; h++) {
      if (!eventsJsonArray[h].date) { continue }
      var eventDate = eventsJsonArray[h].date.split('-');
      // Checking to see if the event date is between the start and the end of the calendar week
      if (eventDate[1] == calShortMonthStart && weekDayStart <= eventDate[2] && eventDate[2] <= weekDayEnd && eventDate[0] == calYear) {
        codeAddresses(eventsJsonArray[h].gallery.street, eventsJsonArray[h].gallery.city, eventsJsonArray[h].gallery.state, eventsJsonArray[h].gallery.zipcode, eventsJsonArray[h].gallery.description, eventsJsonArray[h].gallery.id);
      };
    };
  };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          DAY FUNCTION                                                                          //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Change Markers if Day view has been clicked on the calendar
function day() {

  // Clear the Map of all markers
  clearMap();

  // Fetching the title of the curent day view of the calendar
  var calDayTitle = $('#calendar').fullCalendar('getView').title;

  // Splitting the title to get the digital day
  calDaySplit = calDayTitle.split(' ');
  calYear = calDayTitle.split(' ')[2];
  var calDay = calDaySplit[1].split(',')[0];

  //Verifying if the day is a two digit day, if not add the zero in front
  if (calDay.length === 1) {
      calDay = "0" +  calDay;
  };

  // Go thru the eventsJsonArray and match it with the day on the calendar
  for (var i = 0; i < eventsJsonArray.length; i++) {
    if (!eventsJsonArray[i].date) { continue }
    //Split the date in the json array
    var eventDate = eventsJsonArray[i].date.split('-');

    // Compare the two dates and create the marker
    if (eventDate[1] == calendarMonth() && eventDate[2] == calDay && eventDate[0] == calYear){
      codeAddresses(eventsJsonArray[i].gallery.street, eventsJsonArray[i].gallery.city, eventsJsonArray[i].gallery.state, eventsJsonArray[i].gallery.zipcode, eventsJsonArray[i].gallery.description, eventsJsonArray[i].gallery.id);
    };
  };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function codeAddresses(street, city, state, zipcode, description, id) {
  // Using google geocoder to get the latitude and longitude of the galleries with their adress
  geocoder.geocode({ 'address': street + city + zipcode }, function (results, status) {
    //if the response form the server is OK proceed to creating the markers
    if (status == google.maps.GeocoderStatus.OK) {
      marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
      // Event listener for the infowindow and the content of the info window
      google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<strong>Address:</strong>' + ' ' + street + ', ' + city + ',' + ' ' + state + ',' + ' ' + zipcode + '<br />' +
        '<strong>Description:</strong>' + ' ' + description + '<br />' + ' ' + '<a href="' + '../galleries/' + id + '">Show</a>');
        infowindow.open(map, this);
      });
      // Setting the bounds for the map thru all the markers
      bounds.extend(results[0].geometry.location);
      markersArray.push(marker);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    };
    map.fitBounds(bounds);
  });
}


// Waiting for the page to be loaded in order to listen to the different clicks
$( document ).ready(function() {
  google.maps.event.addDomListener(window, "resize", function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  });
  // Default view of the markers for the current month, not the month on the calendar
  for (var i = 0; i < eventsJsonArray.length; i++) {
    var eventDate = eventsJsonArray[i].date.split('-');
    if (eventDate[1] == curentDate.getMonth() + 1){
      codeAddresses(eventsJsonArray[i].gallery.street, eventsJsonArray[i].gallery.city, eventsJsonArray[i].gallery.state, eventsJsonArray[i].gallery.zipcode, eventsJsonArray[i].gallery.description, eventsJsonArray[i].gallery.id);
    }
  }

  // Listen for the click on the month button in the calendar and run the month() function
  $('.fc-month-button').click(function(){
    month();
  });

  // Listen for the click on the week button in the calendar and run the week() function
  $('.fc-basicWeek-button').click(function(){
    week();
  });
  // Listen for the click on the day button in the calendar and run the day() function
  $('.fc-basicDay-button').click(function(){
    day();
  });
  // Listen for the click on the previous button in the calendar and run the appropriate function
  $('.fc-prev-button').click(function(){

    if ($('#calendar').fullCalendar('getView').name === 'month') {
      month();
    }
    else if ($('#calendar').fullCalendar('getView').name === 'basicWeek') {
      week();
    }
    else if ($('#calendar').fullCalendar('getView').name === 'basicDay') {
      day();
    };
  });

  // Listen for the click on the next button in the calendar and run the appropriate function
  $('.fc-next-button').click(function(){

    if ($('#calendar').fullCalendar('getView').name === 'month') {
      month();
    }
    else if ($('#calendar').fullCalendar('getView').name === 'basicWeek') {
      week();
    }
    else if ($('#calendar').fullCalendar('getView').name === 'basicDay') {
      day();
    };
  });
  //Listen for the click on the next button in the calendar and run the appropriate function
  $('.fc-today-button').click(function(){

    if ($('#calendar').fullCalendar('getView').name === 'month') {
      month();
    }
    else if ($('#calendar').fullCalendar('getView').name === 'basicWeek') {
      week();
    }
    else if ($('#calendar').fullCalendar('getView').name === 'basicDay') {
      day();
    };
  });
});
