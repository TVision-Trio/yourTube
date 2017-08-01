'use strict';

var app = app || {};
var testUser = {name: 'Alana2', pref: {
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
  User.prototype.createUser = function(callback) {
    $.post('/newUser', {name: this.name}).then(function(results){
      console.log(results);
      callback();
    }, function(error){
      console.error(error);
    });
  };
  test.createUser();


  // TODO: UPDATE user function
  // function updateUser(){
  //
  // }
  // TODO: handle user input error

  // TODO: global user object

})(app);
