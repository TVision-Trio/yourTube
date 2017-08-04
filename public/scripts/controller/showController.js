'use strict';

var app = app || {};

(function(module){
  // Pass possible preference option data to the homeview to populate clouds
  var showController = {};

  showController.genreDataToHomeView = (genres) => {
    module.populateGenres(genres);
  };

  showController.daysDataToHomeView = (days) => {
    module.populateDays(days);
  };

  showController.timesDataToHomeView = (times) => {
    module.populateTimes(times);
  };

  // On Submit, query API and get filtered show list based on preferences
  $('#querySubmitButton').on('click', function(){
    module.DataModel.requestShows( (mappedData) => {
      var user = JSON.parse(localStorage.getItem('currentUser'));
      var user_id = user.user_id;
      console.log(user_id);
      module.getUser(user_id, function(user){
        user = new module.User(user);
        user.getGenrePreferences(function(results){
          var genrePref = (JSON.parse(results.genre_id));
          user.getDayPreferences(function(results){
            var dayPref = (JSON.parse(results.day_id));
            user.getTimePreferences(function(results){
              var timePref = (JSON.parse(results.time_id));
              module.DataModel.convertToWords(timePref, dayPref, genrePref, function([timePref, dayPref, genrePref]){
                module.DataModel.filterShows(mappedData, genrePref, dayPref, timePref, function(filteredShows){
                  module.populateResults(filteredShows)
                });
              })
            })
          })
        })
      }
      );
    });
  });

  // On 'detail' click, pass show id to home view to display.
  $('.show-more').on('click', function(){
    var show_id = $(this).attr('value');
    // TODO: call view function to show all show data;
  });

  module.showController = showController;

})(app);
