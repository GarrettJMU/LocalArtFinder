// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
// #= require fullcalendar
$(document).ready(function() {
  $("#compute_option").html($('#to_be_resized option:selected').text());

  $("#to_be_resized").width($("#compute_select").width());

  $('#to_be_resized').change(function(){
    $("#compute_option").html($('#to_be_resized option:selected').text());
    $(this).width($("#compute_select").width());
  });
});
