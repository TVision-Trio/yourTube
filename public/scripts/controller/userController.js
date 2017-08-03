'use strict';

//add handler for landing page
var app = app || {};

(function(module){

  // On load, call module.getUsers to get a list of all users in database:
  module.getUsers(function(users){
    module.populateDropDown(users);
  });

  $('#newUserButton').on('click', function(){
    // TODO: Call landingView function that packages up input into an object. For now, using test
    var newUser = module.packageNewUser();
    newUser.createUser();
  });

  $('#userDropDown').change(function(event){
    //call getTimePref to get preferences for the given user.
    $('#results ul').empty();
    module.getUser(event.target.value, function(userData){
      var user = new module.User(userData);
      module.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      module.getUserPreferences();
    });
  });

  // On submit of pref,
  $('#querySubmitButton').on('click', function(){
    $('#results ul').empty();
    // TODO: get pref object from homeView function. For now, using test pref. These preferences should somehow include a user_id.
    var userPreferences = module.packagePreferences();
    // Get the user that coresponds to the user_id
    module.getUser(userPreferences.user_id, function(userData){
      var user = new module.User(userData);
      user.setTimePreferences(userPreferences.times);
      user.setDayPreferences(userPreferences.days);
      user.setGenrePreferences(userPreferences.genres);
      console.log(userPreferences.user_id);
      module.DataModel.requestShows( (mappedData) => {
        module.getUser(userPreferences.user_id, function(user){
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
  });


})(app);
