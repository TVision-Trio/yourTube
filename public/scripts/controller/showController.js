'use strict';

var app = app || {};

(function(){

  // On Submit, query API and get filtered show list based on preferences
  $('#querySubmitButton').on(function(){
    app.DataModel.requestShows(function(){
      var filteredShows = app.DataModel.filterShows(['Comedy','Drama'],['Monday', 'Tuesday'], ['Evening']);
      // TODO: Pass filtered shows to view function to display
    });
  });

  // On 'detail' click, pass show id to home view to display.
  $('.show-more').on(function(){
    var show_id = $(this).attr('value');
    // TODO: call view function to show all show data;
  });

})();
