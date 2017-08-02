'use strict';

//add handler for landing page
var app = app ||{};

(function(){
  var userController = {};

  userController.index = function(){
    $ajax({
      url:'/getUsers',
      method: GET,
    }).then(function(results){
      console.log(results);
    }), function(error){
      console.log('error');
    }
  }

  // $('#input').on('submit', (e) => {
  //  e.preventDefault();
  // })
  //  console.log(newUser);


})(app)
