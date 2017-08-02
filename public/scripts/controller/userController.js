'use strict';

//add handler for landing page
var app = app ||{};

(function(module){

  var userController = {};

  $('#newUserButton').on('click', function(){
    // TODO: Call landingView function that packages up input into an object. For now, using test
    var newUser = new module.User({name: 'Alana3', username: 'alanafrankly3'});
    console.log(newUser);
    newUser.createUser();
  });

  // On submit of pref,
    // TODO: get pref object from homeView function. For now, using test pref. These preferences should somehow include a user_id.
    var userPreferences = {user_id: 9, genres:['Comedy','Drama'], days:['Monday', 'Tuesday'], times:['Evening']};
    // TODO: update each preference table with these preferences

})(app);
