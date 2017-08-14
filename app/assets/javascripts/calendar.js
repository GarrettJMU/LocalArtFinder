$(document).ready(function() {
    $('#calendar').fullCalendar({
        // put your options and callbacks here
        events:  '/events/get_cal',

     header: {left: 'prev,next', center: 'title', right: 'month,basicWeek,basicDay'},
     eventClick: function(event) {
      if (event.url) {
          window.open(event.url);
          return false;}
      },
     dayClick: function(date, allDay, jsEvent, view) { $('#calendar').fullCalendar('changeView', 'basicDay') },
     timeFormat: "LT",

    })
});
