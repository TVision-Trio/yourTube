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

  // After submit, show data in homeview template.
  module.populateResults = function(shows){
    shows.forEach(function(show){
      var resultsTemplate = Handlebars.compile($('#results-template').html());
      var html = resultsTemplate(show);
      $('#results ul').append(html);
    });
  }

  // clicked class

})(app);
