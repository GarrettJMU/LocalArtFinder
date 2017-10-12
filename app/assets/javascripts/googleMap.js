var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
var monthShortNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
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
var calShortMonthStart;
var calShortMonthEnd;
var calWeek;
var weekDayStart;
var weekDayEnd;

// Fetching the json file for the galleries
$.getJSON('galleries.json', function (json) {
  jsonarray = json;
});

// Fetching the json file for the events
$.getJSON('events.json', function (json) {
  eventsJsonArray = json;
});

// Initialization of Google Map
function initMap() {

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
}

// Sends the infos from the JSON file to the geocoder thru the codeAddresses function
function plotMarkers() {
  for (i = 0; i < jsonarray.length; i++) {
    codeAddresses(jsonarray[i].street, jsonarray[i].city, jsonarray[i].state, jsonarray[i].zipcode, jsonarray[i].description, jsonarray[i].id);
  }
}

// Get the 2 digit month from the calendar
function calendarMonth() {

  // Pulling the name of the month on the calendar title, comparing it with the monthNames array to get the index and add 1 to have the numerical value of the month
  var calMonth = monthNames.indexOf($('#calendar').fullCalendar('getView').title.split(' ')[0]) + 1;
  calMonth = calMonth.toString();
  console.log("calMonth", calMonth);
  if (calMonth.length === 1) {
    calMonth = "0" + calMonth;
  }
  return calMonth;
};


function calendarShortMonth() {
  calShortMonthStart = monthShortNames.indexOf($('#calendar').fullCalendar('getView').title.split(' ')[0]) + 1;
  calShortMonthStart = calShortMonthStart.toString();
  if (calShortMonthStart.length === 1) {
    calShortMonthStart = "0" + calShortMonthStart;
  };
  if ($('#calendar').fullCalendar('getView').title.split(' ').length === 6) {
    calShortMonthEnd = monthShortNames.indexOf($('#calendar').fullCalendar('getView').title.split(' ')[3]) + 1;
    calShortMonthEnd = calShortMonthEnd.toString();

    if (calShortMonthEnd.length === 1) {
      calShortMonthEnd = "0" + calShortMonthEnd;
    }
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
      console.log("weekDayEnd", weekDayEnd);
  } else {
      weekDayEnd = weekTitleEnd;
      console.log("weekDayEnd else", weekDayEnd);
  };
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Change Markers if Month view has been clicked on the calendar //
function month() {
  // Clear the Map of all markers
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Change Markers if week view has been clicked on the calendar //
function week() {

  // Clear the Map of all markers
  clearMap();
  calendarWeek();
  calendarShortMonth()

  if (calWeek.title.length == 20){
    for (j = 0; j < eventsJsonArray.length; j++) {
      var eventDate = eventsJsonArray[j].date.split('-');
      // CHECK FOR THE VALIDITY OF THE DATE (START MONTH, START DATE, END MONTH, END DATE)
      if ((calShortMonthStart == eventDate[1] && 31 >= eventDate[2] >= weekDayStart) || (calShortMonthEnd == eventDate[1] && 1 <= eventDate[2] <= weekDayEnd)) {
        console.log("If split check");
        codeAddresses(eventsJsonArray[j].gallery.street, eventsJsonArray[j].gallery.city, eventsJsonArray[j].gallery.state, eventsJsonArray[j].gallery.zipcode, eventsJsonArray[j].gallery.description, eventsJsonArray[j].gallery.id);
      }
    }
  }
  else {
    for (h = 0; h < eventsJsonArray.length; h++) {
      var eventDate = eventsJsonArray[h].date.split('-');
      if (eventDate[1] == calShortMonthStart && weekDayStart <= eventDate[2] && eventDate[2] <= weekDayEnd) {
        codeAddresses(eventsJsonArray[h].gallery.street, eventsJsonArray[h].gallery.city, eventsJsonArray[h].gallery.state, eventsJsonArray[h].gallery.zipcode, eventsJsonArray[h].gallery.description, eventsJsonArray[h].gallery.id);
      }
    }
  }

  // Spliting the event date to match it with the calendar
    // Checking to see if the event date is between the start and the end of the calendar week
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Change Markers if Day view has been clicked on the calendar
function day() {

  // Clear the Map of all markers
  clearMap();
  // Fetching the title of the curent day view of the calendar
  var calDayTitle = $('#calendar').fullCalendar('getView').title;

  // Splitting the title to get the digital day
  calDaySplit = calDayTitle.split(' ');
  var calDay = calDaySplit[1].split(',')[0];
  //Verifying if the day is a two digit day, if not add the zero in front
  if (calDay.length === 1) {
      calDay = "0" +  calDay;
  };

  // Go thru the eventsJsonArray and match it with the day on the calendar
  for (i = 0; i < eventsJsonArray.length; i++) {
    //Split the date in the json array
    var eventDate = eventsJsonArray[i].date.split('-');

    // Compare the two dates and create the marker
    if (eventDate[1] == calendarMonth() && eventDate[2] == calDay){
      codeAddresses(eventsJsonArray[i].gallery.street, eventsJsonArray[i].gallery.city, eventsJsonArray[i].gallery.state, eventsJsonArray[i].gallery.zipcode, eventsJsonArray[i].gallery.description, eventsJsonArray[i].gallery.id);
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

// Waiting for the page to be loaded in order to listen to the different clicks
$( document ).ready(function() {
  // Default view of the markers for the current month, not the month on the calendar
  for (i = 0; i < eventsJsonArray.length; i++) {
    var eventDate = eventsJsonArray[i].date.split('-');
    if (eventDate[1] == curentDate.getMonth() + 1){
      codeAddresses(eventsJsonArray[i].gallery.street, eventsJsonArray[i].gallery.city, eventsJsonArray[i].gallery.state, eventsJsonArray[i].gallery.zipcode, eventsJsonArray[i].gallery.description, eventsJsonArray[i].gallery.id);
    }
  }

  // Listen for the click on the month button in the calendar and run the month() function
  $('.fc-month-button').click(function(){
    console.log("Month Clicked !!");
    month();
  });

  // Listen for the click on the week button in the calendar and run the week() function
  $('.fc-basicWeek-button').click(function(){
    console.log("Week Clicked !!");
    week();
  });
  // Listen for the click on the day button in the calendar and run the day() function
  $('.fc-basicDay-button').click(function(){
    console.log("Day Clicked !!");
    day();
  });
  // Listen for the click on the previous button in the calendar and run the appropriate function
  $('.fc-prev-button').click(function(){
    console.log("Previous Clicked !!");
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
    console.log("Next Clicked !!");
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
  Listen for the click on the next button in the calendar and run the appropriate function
  $('.fc-today-button').click(function(){
    console.log("Today Clicked !!");
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
