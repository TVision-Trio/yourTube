'use strict';

var app = app || {};

(function(module){
  // BEFORE SHOW QUERY
  // Populate cloud tags from database.

  module.populateGenres = (genres) => {
    genres.forEach((genre) => {
      var genreTemplate = Handlebars.compile($('#genre-cloud-template').html());
      $('#genreCloud').append(genreTemplate(genre));
    });
  }

  module.populateDays = (days) => {
    days.forEach((day) => {
      var dayTemplate = Handlebars.compile($('#day-cloud-template').html());
      $('#dayCloud').append(dayTemplate(day));
    });
  }

  module.populateTimes = (times) => {
    times.forEach((time) => {
      var timeTemplate = Handlebars.compile($('#time-cloud-template').html());
      $('#timeCloud').append(timeTemplate(time));
    });
  }

  // module.populateClouds = function(results){
  //   var times = [{time: 'Morning'}, {time: 'Afternoon'}, {time: 'Evening'}];
  //   times.forEach(function(time){
  //     var timeTemplate = Handlebars.compile($('#time-cloud-template').html());
  //     var html = timeTemplate(time);
  //     $('#timeCloud').append(html);
  //   });
  //   var days = [{day: 'Monday'}, {day: 'Tuesday'}, {day: 'Wednesday'}, {day: 'Thursday'}, {day: 'Friday'}, {day: 'Saturday'}, {day: 'Sunday'}];
  //   days.forEach(function(day){
  //     var dayTemplate = Handlebars.compile($('#day-cloud-template').html());
  //     var html = dayTemplate(day);
  //     $('#dayCloud').append(html);
  //   });
  //   var genres = results;
  //   genres.forEach(function(genre){
  //     var genreTemplate = Handlebars.compile($('#genre-cloud-template').html());
  //     var html = genreTemplate(genre);
  //     $('#genreCloud').append(html);
  //   });
  // };

  // After submit, show data in homeview template.
  module.populateResults = function(shows){
    shows.forEach(function(show){
      var resultsTemplate = Handlebars.compile($('#results-template').html());
      var html = resultsTemplate(show);
      $('#results ul').append(html);
    });
  }
})(app);
