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
  module.getUserPreferences = function(){
    module.DataModel.requestShows( (mappedData) => {
      var user_id = 1;
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
                  // for each of the user pref arrays
                  // for each pref within that array
                  genrePref.forEach(function(genre){
                    // for each li item in that type of preference cloud
                    $('li.genre').each(function(index, li){
                      // console.log($(li).text());
                      // if they are the same
                      if ($(li).text() === genre){
                      //   // add selected class to that li
                        ($(li)).addClass('selected');
                      }
                    })
                  })
                  module.populateResults(filteredShows)
                });
              })
            })
          })
        })
      }
      );
    });
  };

  // On 'detail' click, pass show id to home view to display.
  $('.show-more').on('click', function(){
    var show_id = $(this).attr('value');
    // TODO: call view function to show all show data;
  });

  module.showController = showController;

})(app);
