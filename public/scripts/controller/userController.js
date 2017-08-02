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

  // On submit of pref,
  $('#querySubmitButton').on('click', function(){
    // TODO: get pref object from homeView function. For now, using test pref. These preferences should somehow include a user_id.
    var userPreferences = {user_id: 1, genres:[25,27], days:[1,2], times:[2, 3]};
    // Get the user that coresponds to the user_id
    var currentUser = module.getUser(1, function(userData){
      var user = new module.User(userData);
      console.log(user);
      user.setTimePreferences(userPreferences.times);
      console.log(user);
    });
    // TODO: update each preference table with these preferences

  });


})(app);
