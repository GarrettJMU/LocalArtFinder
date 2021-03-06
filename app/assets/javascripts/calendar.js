$(document).ready(function() {
    $('#calendar').fullCalendar({
      events:  '/events/get_cal',

       header: {left: 'prev,next today', center: 'title', right: 'month,basicWeek,basicDay'},

       eventClick: function(event) {
        if (event.url) {
            window.open(event.url);
            return false;}
        },

       dayClick: function(date, allDay, jsEvent, view) { $('#calendar').fullCalendar('changeView', 'basicDay') },
       timeFormat: "LT",

    })

});
