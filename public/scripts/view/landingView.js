'use strict';

var app = app || {};

(function(module){
  module.populateDropDown = function(users) {
    users.forEach(function(user) {
      user.func = function(){
        console.log('I am being called from populateDropDown when you click on a user from the drop down');
      };
      var userTemplate = Handlebars.compile($('#dropdown-template').html());
      $('#userDropDown').append(userTemplate(user));
    });
  };
})(app);
