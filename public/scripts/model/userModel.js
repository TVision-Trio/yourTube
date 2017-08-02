'use strict';

var app = app || {};
var testUser = {name: 'Alana', user_id: 1, genres: ['comedy', 'horror'], days: ['monday', 'tuesday', 'friday'], times: ['evening']
};

(function(module){

  function User(userData){
    this.name = userData.name;
    if (userData.user_id) {
      this.user_id = userData.user_id;
    }
    if (userData.genres) {
      this.genres = userData.genres;
    }
    if (userData.days) {
      this.days = userData.days;
    }
    if (userData.times) {
      this.times = userData.times;
    }
  }

  var currentUser = new User(testUser);

  // CREATE user in database based on user input
  // TODO: handle user input error
  User.prototype.createUser = function() {
    $.post('/newUser', {name: this.name}).then(function(results){
      console.log(results);
      this.user_id = results.user_id;
    }, function(error){
      console.error(error);
    });
  };

  // UPDATE user in database based on updated preferences
  // TODO: Would this ever be called on a user that has not been created in the database? If so, this function will throw an error because the user.id will not yet exisit
  User.prototype.updateUser = function() {
    if (!this.user_id){
      console.error('Error: updateUser method can not be applied to a user that does not have an assigned user_id');
    } else {
      $.ajax({
        url:'/updateUser',
        method: 'PUT',
        data: {name: this.name, user_id: this.user_id, genres: this.genres, days: this.days, times: this.times}
      }).then(function(results){
        console.log(results);
      }, function(error){
        console.error(error);
      });
    }
  };

  // TODO: GET data from database by user_id
  User.prototype.getUser = function() {
    $.ajax({
      url:'/getUser',
      method: 'GET',
      data: {user_id: this.user_id}
    }).then(function(results){
      console.log(results);
    }, function(error){
      console.error(error);
    });
  };

  // TODO: How does this currentUser variable get updated?
  // Save current user to global app
  module.currentUser = currentUser;

})(app);
