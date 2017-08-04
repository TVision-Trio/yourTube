'use strict';

//add handler for landing page
var app = app || {};

(function(module){

  // On load, call module.getUsers to get a list of all users in database:
  module.getUsers(function(users){
    module.populateDropDown(users);
  });

  $('#newUserButton').on('click', function(){
    $('#results ul').empty();
    // TODO: Call landingView function that packages up input into an object. For now, using test
    var newUser = module.packageNewUser();
    newUser.createUser();
  });

  $('#userDropDown').change(function(event){
    $('#results ul').empty();
    //call getTimePref to get preferences for the given user.
    $('#results ul').empty();
    module.getUser(event.target.value, function(userData){
      var user = new module.User(userData);
      var user_id = user.user_id;
      localStorage.setItem('currentUser', JSON.stringify(user));
      var timePref = user.getTimePreferences(function(timePref){
        timePref = timePref.time_id.slice(1,-1).split(',');
        user.getGenrePreferences(function(genrePref){
          genrePref = genrePref.genre_id.slice(1,-1).split(',');
          user.getDayPreferences(function(dayPref){
            dayPref = dayPref.day_id.slice(1,-1).split(',');
            var userPref = {days: dayPref, times: timePref, genres: genrePref, user_id: user_id};
            // call view function to send this information back to the view.
            module.DataModel.requestShows( (mappedData) => {
              var user_id = userPref.user_id;
              module.getUser(user_id, function(user){
                user = new module.User(user);
                var timePref = userPref.times;
                var dayPref = userPref.days;
                var genrePref = userPref.genres;
                console.log(genrePref);

                module.DataModel.convertToWords(timePref, dayPref, genrePref, function(timePref, dayPref, genrePref){
                  console.log(mappedData);
                  console.log(genrePref);
                  module.DataModel.filterShows(mappedData, genrePref, dayPref, timePref, function(filteredShows){
                    console.log(filteredShows);
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
                    console.log(filteredShows);
                    module.populateResults(filteredShows)
                  });
                })
              }
              );
            })
          });
        });
      });
    });
  });

  // On submit of pref,
  $('#querySubmitButton').on('click', function(){
    $('#results ul').empty();
    // TODO: get pref object from homeView function. For now, using test pref. These preferences should somehow include a user_id.
    var userPreferences = module.packagePreferences();
    module.getUserPreferences(userPreferences);
    // user.setTimePreferences(userPreferences.times);
    // user.setDayPreferences(userPreferences.days);
    // user.setGenrePreferences(userPreferences.genres);
    // Get the user that coresponds to the user_id
    // module.getUser(userPreferences.user_id, function(userData){
    //   var user = new module.User(userData);
    //   user.setTimePreferences(userPreferences.times);
    //   user.setDayPreferences(userPreferences.days);
    //   user.setGenrePreferences(userPreferences.genres);
    //   console.log(userPreferences.user_id);
    //   module.DataModel.requestShows( (mappedData) => {
    //     module.getUser(userPreferences.user_id, function(user){
    //       user = new module.User(user);
    //       user.getGenrePreferences(function(results){
    //         console.log(results);
    //         var genrePref = (JSON.parse(results.genre_id));
    //         user.getDayPreferences(function(results){
    //           var dayPref = (JSON.parse(results.day_id));
    //           user.getTimePreferences(function(results){
    //             var timePref = (JSON.parse(results.time_id));
    //             module.DataModel.convertToWords(timePref, dayPref, genrePref, function([timePref, dayPref, genrePref]){
    //               module.DataModel.filterShows(mappedData, genrePref, dayPref, timePref, function(filteredShows){
    //                 module.populateResults(filteredShows)
    //               });
    //             })
    //           })
    //         })
    //       })
    //     }
    //   );
    // });
    // });
  });


})(app);
