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
    module.getUser(event.target.value, function(userData){
      var user = new module.User(userData);
      localStorage.setItem('currentUser', JSON.stringify(user));
      user.getTimePreferences(function(timePref){
        timePref = JSON.parse(timePref.time_id);
        // TODO: call view function to send this information back to the view.

      });
      user.getGenrePreferences(function(genrePref){
        genrePref = JSON.parse(genrePref.genre_id);
        // TODO: call view function to send this information back to the view.
      });
      user.getDayPreferences(function(dayPref){
        dayPref = JSON.parse(dayPref.day_id);
        // TODO: call view function to send this information back to the view.
      });
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
    });
    // TODO: update each preference table with these preferences

  });


})(app);
