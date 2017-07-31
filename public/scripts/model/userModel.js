'use strict';

var app = app || {};
var testUser = {name: 'Alana', pref: {
  genres: ['comedy', 'horror'],
  days: ['monday', 'tuesday', 'friday'],
  times: ['evening']
}};

(function(module){

  console.log('inside userModel');

  function User(userData){
    this.name = userData.name;
    this.preferences = userData.pref;
  }
  var test = new User(testUser);


  // TODO: CREATE user function (based on user input)
  function createUser(userObject, callback){
    $.ajax({
      url: '/newUser',
      method: 'POST',
      data: userObject
    }).then(function(){
      console.info('User created');
      callback();
    });
  };

  function callbackFunction(){
    console.log('I\'m a callback!');
  }
  createUser(testUser, callbackFunction);

  // TODO: UPDATE user function
  // function updateUser(){
  //
  // }
  // TODO: handle user input error

  // TODO: global user object
  // app.user = user;


})(app);
