'use strict';

var app = app || {};

(function(module){
  // BEFORE SHOW QUERY
  // Populate cloud tags from database.
  module.populateClouds = function(results){
    var times = [{time: 'Morning'}, {time: 'Afternoon'}, {time: 'Evening'}];
    times.forEach(function(time){
      var timeTemplate = Handlebars.compile($('#time-cloud-template').html());
      var html = timeTemplate(time);
      $('#timeCloud').append(html);
    });
    var days = [{day: 'Monday'}, {day: 'Tuesday'}, {day: 'Wednesday'}, {day: 'Thursday'}, {day: 'Friday'}, {day: 'Saturday'}, {day: 'Sunday'}];
    days.forEach(function(day){
      var dayTemplate = Handlebars.compile($('#day-cloud-template').html());
      var html = dayTemplate(day);
      $('#dayCloud').append(html);
    });
    var genres = results;
    genres.forEach(function(genre){
      var genreTemplate = Handlebars.compile($('#genre-cloud-template').html());
      var html = genreTemplate(genre);
      $('#genreCloud').append(html);
    });
  };

  //
  // After:
  // After submit, show data in homeview template.
})(app);
