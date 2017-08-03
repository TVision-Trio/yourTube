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
      var user_id = 1;
      var filteredShows = module.getUser(user_id, function(user){
        user = new module.User(user);
        console.log(user);
        var x = user.getGenrePreferences(function(genrePref){
          var y = (JSON.parse(genrePref.genre_id));
          return y;
        });
        console.log(x);
        // module.DataModel.filterShows(JSON.parse(user.getGenrePreferences()), JSON.parse(user.getDayPreferences()), JSON.parse(user.getTimePreferences()))
        // module.populateResults(filteredShows);
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
