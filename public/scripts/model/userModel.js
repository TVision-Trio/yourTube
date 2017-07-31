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
  function createUser(){
    $.ajax({
      url: 'http://localhost:3000/newUser',
      method: 'POST',
      data: {name: 'TestTest'}
    }).then(function(){
      console.info('User created');

      // callback();
    });
  };

  createUser();

  // TODO: UPDATE user function
  // function updateUser(){
  //
  // }
  // TODO: handle user input error

  // TODO: global user object
  // app.user = user;


})(app);
