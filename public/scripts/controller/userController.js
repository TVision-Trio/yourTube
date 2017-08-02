'use strict';

//add handler for landing page
var app = app ||{};

(function(module){

  var userController = {};

  $('#newUserButton').on('click', function(){
    // TODO: Call landingView function that packages up input into an object. For now, using test
    var newUser = new module.User({name: 'Alana3', username: 'alanafrankly3'});
    newUser.createUser();
  });

      $('#userDropDown').change(function(e){
        // TODO: Assuming I have the user_id from somewhere...
        var user_id = 1;

        module.getUser(user_id, function(userData){
          var user = new module.User(userData);
          var userTimePref = user.getTimePreferences(function(timePref){
            console.log(timePref);
          });
        });
        // TODO: call userModel function to get preferences for the given user.
      });

  // On submit of pref,
  $('#querySubmitButton').on('click', function(){
    // TODO: get pref object from homeView function. For now, using test pref. These preferences should somehow include a user_id.
    var userPreferences = {user_id: 1, genres:[25,27], days:[1,2], times:[2, 3]};
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
