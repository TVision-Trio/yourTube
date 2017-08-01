'use strict';

var app = app || {};

(function(module){
  const showController = {};

  // $('#querySubmitButton').on(function(){
  //
  // })
  app.DataModel.requestShows(function(){
    app.DataModel.filterShows(['Comedy','Drama'],['Monday', 'Tuesday'], ['Evening']);
  })

  // on submit -
  // Build query string, pass it to show model
  // Get show data back, pass to home view.
  //
  // On 'detail' click, pass show id to home view to display.

})(app);
