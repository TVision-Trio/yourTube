'use strict';

//add handler for landing page
var app = app ||{};

(function(module){

  var userController = {};

  $('#newUserButton').on('click', function(){
    // TODO: Call landingView function that packages up input into an object. For now, using test
    var newUser = new module.User({name: 'Alana');
    console.log(newUser);
    newUser.createUser();
  });

})(app);
