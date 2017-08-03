'use strict';

var app = app || {};

(function(module){
  module.currentUser = module.currentUser || {};

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
      this.user_id = results.user_id;
      module.currentUser = results;
      localStorage.setItem('currentUser', JSON.stringify(module.currentUser));
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

  // GET data from database by user_id
  module.getUser = function(user_id, callback) {
    $.ajax({
      url:'/getUser',
      method: 'GET',
      data: {user_id: user_id}
    }).then(function(results){
      callback(results);
    }, function(error){
      console.error(error);
    });
  };

  // GET ALL users from database
  module.getUsers = function(callback) {
    $.ajax({
      url:'/getUsers',
      method: 'GET'
    }).then(function(results){
      callback(results);
    }, function(error){
      console.error(error);
    });
  };

  // SET user preferences in time_preference table
  User.prototype.setTimePreferences = function(timePrefArray) {
    $.ajax({
      url:'/setTimePreferences',
      method: 'PUT',
      data: {times: JSON.stringify(timePrefArray), user_id: this.user_id}
    }).then(function(results){
      return results;
    }, function(error){
      console.error(error);
    });
  };

  // GET user time preferences from time_preference table
  User.prototype.getTimePreferences = function(callback) {
    $.ajax({
      url:'/getTimePreferences',
      method: 'GET',
      data: {user_id: this.user_id}
    }).then(function(results){
      callback(results);
    }, function(error){
      console.log('Failed at getting time preferences');
      console.error(error);
    });
  };

  // SET user preferences in day_preference table
  User.prototype.setDayPreferences = function(dayPrefArray) {
    $.ajax({
      url:'/setDayPreferences',
      method: 'PUT',
      data: {days: JSON.stringify(dayPrefArray), user_id: this.user_id}
    }).then(function(results){
      return results;
    }, function(error){
      console.error(error);
    });
  };

  // GET user day preferences from day_preference table
  User.prototype.getDayPreferences = function(callback) {
    $.ajax({
      url:'/getDayPreferences',
      method: 'GET',
      data: {user_id: this.user_id}
    }).then(function(results){
      if (callback) callback(results);
    }, function(error){
      console.log('Failed at getting day preferences');
      console.error(error);
    });
  };

  // SET user preferences in genre_preference table
  User.prototype.setGenrePreferences = function(genrePrefArray) {
    $.ajax({
      url:'/setGenrePreferences',
      method: 'PUT',
      data: {genres: JSON.stringify(genrePrefArray), user_id: this.user_id}
    }).then(function(results){
      return results
    }, function(error){
      console.error(error);
    });
  };

  // GET user genre preferences from genre_preference table
  User.prototype.getGenrePreferences = function(callback) {
    $.ajax({
      url:'/getGenrePreferences',
      method: 'GET',
      data: {user_id: this.user_id}
    }).then(function(results){
      if (callback) callback(results);
    }, function(error){
      console.log('Failed at getting genre preferences');
      console.error(error);
    });
  };

  module.User = User;

})(app);
