'use strict';

var app = app || {};

(function(module){
  // BEFORE SHOW QUERY
  // Populate cloud tags from database.

  // Helped Function to make onlclick event work for Handlebar populated li's
  // Referenced from: http://jsfiddle.net/fHycd/
  Handlebars.registerHelper('stringifyFunc', function(func) {
       return new Handlebars.SafeString("(" +
                  func.toString().replace(/\"/g,"'") + ")()");
  });

  module.populateGenres = (genres) => {
    genres.forEach((genre) => {
      genre.func = function(){
        $(this.event.target).toggleClass('selected');
      }
      var genreTemplate = Handlebars.compile($('#genre-cloud-template').html());
      $('#genreCloud').append(genreTemplate(genre));
    });
  }

  module.populateDays = (days) => {
    days.forEach((day) => {
      day.func = function(){
        $(this.event.target).toggleClass('selected');
      }
      var dayTemplate = Handlebars.compile($('#day-cloud-template').html());
      $('#dayCloud').append(dayTemplate(day));
    });
  }

  module.populateTimes = (times) => {
    times.forEach((time) => {
      time.func = function(){
        $(this.event.target).toggleClass('selected');
      }
      var timeTemplate = Handlebars.compile($('#time-cloud-template').html());
      $('#timeCloud').append(timeTemplate(time));
    });
  }

  module.packagePreferences = function(){
    var genreArray = [];
    var timeArray = [];
    var dayArray = [];
    // console.log($('li.selected.genre'));
    $.each($('li.selected.genre'), function(index, genre){
      genreArray.push(genre.value);
    });
    $.each($('li.selected.time'), function(index, time){
      timeArray.push(time.value);
    });
    $.each($('li.selected.day'), function(index, day){
      dayArray.push(day.value);
    });
    // TODO: DON'T hardcode this userid
    localStorage.setItem('currentUser', JSON.stringify({user_id: 1, days: dayArray, times: timeArray, genres: genreArray}));
    return {user_id: 1, days: dayArray, times: timeArray, genres: genreArray};
  }

  // After submit, show data in homeview template.
  module.populateResults = function(shows){
    shows.forEach(function(show){
      var resultsTemplate = Handlebars.compile($('#results-template').html());
      var html = resultsTemplate(show);
      $('#results ul').append(html);
    });
  }
})(app);
