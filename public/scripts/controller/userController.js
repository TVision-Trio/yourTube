'use strict';

//add handler for landing page
var app = app || {};

(function(module) {

  // On load, call module.getUsers to get a list of all users in database:
  module.getUsers(function(users) {
    module.populateDropDown(users);
  });

  $('#newUserButton').on('click', function() {
    $('#results ul').empty();
    // TODO: Call landingView function that packages up input into an object. For now, using test
    var newUser = module.packageNewUser();
    newUser.createUser();
    $('#userDropDown').empty();
    $('#userDropDown').append('<option default>Select a User &#x25BC;</option>');
    $('#name, #username').val('');
    module.getUsers(function(users) {
      module.populateDropDown(users);
    });
  });

  $('#userDropDown').change(function(event) {
    module.showController.initMain();
    $('#results ul').empty();
    //call getTimePref to get preferences for the given user.
    $('#results ul').empty();
    module.getUser(event.target.value, function(userData) {
      var user = new module.User(userData);
      var user_id = user.user_id;
      localStorage.setItem('currentUser', JSON.stringify(user));
      var timePref = user.getTimePreferences(function(timePref) {
        // timePref.push()
        console.log(timePref);
        // console.log(JSON.parse(timePrefId));
        // var sliced = timePref.time_id.slice(1,-1).split(',');

        user.getGenrePreferences(function(genrePref) {
          // genrePref = parseInt(genrePref.genre_id.slice(1,-1).split(','));
          user.getDayPreferences(function(dayPref) {
            // dayPref = parseInt(dayPref.day_id.slice(1,-1).split(','));
            console.log(dayPref);
            var userPref = {
              days: dayPref,
              times: timePref,
              genres: genrePref,
              user_id: user_id
            };
            // call view function to send this information back to the view.
            console.log(userPref);
            module.getUserPreferences(userPref);
          });
        });
      });
    });
  });

  // On submit of pref,
  $('#querySubmitButton').on('click', function() {
    $('#results ul').empty();
    var userPreferences = module.packagePreferences();
    module.getUserPreferences(userPreferences);
    console.log(userPreferences);
  });

})(app);
