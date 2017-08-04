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
  module.getUserPreferences = function(userPref){
    console.log(userPref);
    module.DataModel.requestShows( (mappedData) => {
      // var user = JSON.parse(localStorage.getItem('currentUser'));
      var user_id = userPref.user_id;
      module.getUser(user_id, function(user){
        user = new module.User(user);
        user.setTimePreferences(userPref.times);
        user.setDayPreferences(userPref.days);
        user.setGenrePreferences(userPref.genres);
        console.log(user);
        user.getGenrePreferences(user_id, function(results){
          // var genrePref = (JSON.parse(results.genre_id));
          user.getDayPreferences(function(results){
            // var dayPref = (JSON.parse(results.day_id));
            user.getTimePreferences(function(results){
              // var timePref = (JSON.parse(results.time_id));
              var timePref = userPref.times;
              var dayPref = userPref.days;
              var genrePref = userPref.genres;
              module.DataModel.convertToWords(timePref, dayPref, genrePref, function([timePref, dayPref, genrePref]){
                module.DataModel.filterShows(mappedData, genrePref, dayPref, timePref, function(filteredShows){
                  // for each of the user pref arrays
                  // for each pref within that array
                  genrePref.forEach(function(genre){
                    // for each li item in that type of preference cloud
                    $('li.genre').each(function(index, li){
                      // if they are the same
                      if ($(li).text() === genre){
                      // add selected class to that li
                        ($(li)).addClass('selected');
                      }
                    })
                  })
                  dayPref.forEach(function(day){
                    $('li.day').each(function(index, li){
                      if ($(li).text() === day){
                        ($(li)).addClass('selected');
                      }
                    })
                  })
                  timePref.forEach(function(time){
                    $('li.time').each(function(index, li){
                      if ($(li).text() === time){
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
    })
  };

  module.showController = showController;

})(app);
