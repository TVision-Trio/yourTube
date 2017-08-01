'use strict';

var app = app || {};

(function(module){
  // Pass possible preference option data to the homeview to populate clouds
  var showController = {};

  // Function to pass homeview data
  showController.genreDataToHomeView = function(results){
    module.populateClouds(results);
  };

  showController.days = [{day: 'Monday'}, {day: 'Tuesday'}, {day: 'Wednesday'}, {day: 'Thursday'}, {day: 'Friday'}, {day: 'Saturday'}, {day: 'Sunday'}];
  showController.times = [{time: 'Morning'}, {time: 'Afternoon'}, {time: 'Evening'}];


  // On Submit, query API and get filtered show list based on preferences
  $('#querySubmitButton').on(function(){
  });
  module.DataModel.requestShows(function(){
    var filteredShows = module.DataModel.filterShows(['Comedy','Drama'],['Monday', 'Tuesday'], ['Evening']);
    // TODO: Pass filtered shows to view function to display
    module.populateResults(filteredShows);
  });

  // On 'detail' click, pass show id to home view to display.
  $('.show-more').on(function(){
    var show_id = $(this).attr('value');
    // TODO: call view function to show all show data;
  });

  module.showController = showController;

})(app);
