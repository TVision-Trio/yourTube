'use strict';

var app = app || {};
var testUser = {name: 'Alana', user_id: 66, preferences: {
  genres: ['comedy', 'horror'],
  days: ['monday', 'tuesday', 'friday'],
  times: ['evening']
}};

(function(module){

  function User(userData){
    this.name = userData.name;
    this.preferences = userData.pref;
    if (userData.user_id) {
      this.user_id = userData.user_id;
    }
  }

  var test = new User(testUser);

  // CREATE user in database based on user input
  User.prototype.createUser = function() {
    $.post('/newUser', {name: this.name, preferences: this.preferences}).then(function(results){
      console.log(results);
      this.user_id = results.user_id;
    }, function(error){
      console.error(error);
    });
  };

  // TODO: UPDATE user function
  // TODO: Would this ever be called on a user that has not been created in the database? If so, this function will throw an error because the user.id will not yet exisit
  User.prototype.updateUser = function() {
    if (!this.user_id){
      console.error('Error: updateUser method can not be applied to a user that does not have an assigned user_id');
    } else {
      $.ajax({
        url:'/updateUser',
        method: 'PUT',
        data: {name: this.name, user_id: this.user_id, preferences: this.preferences}
      }).then(function(results){
        console.log(results);
      }, function(error){
        console.error(error);
      });
    };
  };
  test.updateUser();

  // TODO: handle user input error

  // TODO: global user object

})(app);
