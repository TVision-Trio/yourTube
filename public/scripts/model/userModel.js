'use strict';

var app = app || {};

(function(module){

  function User(userData){
    this.name = userData.name;
    this.username = userData.username;
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

  // CREATE user in database based on user input
  // TODO: handle user input error
  User.prototype.createUser = function() {
    $.post('/newUser', {name: this.name, username: this.username}).then(function(results){
      console.log(results);
      this.user_id = results.user_id;
    }, function(error){
      // TODO: Handle error duplicate usernames
      console.error(error);
    });
  };

  // UPDATE user in database based on updated preferences
  // TODO: Do we need this function anymore? I don't think there is any reason we would be updating the specific user in our MVP.
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

  // TODO: GET ALL users from database
  User.prototype.getUsers = function() {
    $.ajax({
      url:'/getUsers',
      method: 'GET'
    }).then(function(results){
      console.log(results);
    }, function(error){
      console.error(error);
    });
  };

  // TODO: GET ALL users from database
  User.prototype.setTimesPreferences = function() {
    $.ajax({
      url:'/setTimesPreferences',
      method: 'POST'
    }).then(function(results){
      console.log(results);
    }, function(error){
      console.error(error);
    });
  };

  // TODO: How does this currentUser variable get updated? Does this even need to be in this file?
  // Save current user to global app
  module.User = User;

})(app);
