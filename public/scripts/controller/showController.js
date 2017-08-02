'use strict';

var app = app || {};

(function(module){
  // Pass possible preference option data to the homeview to populate clouds
  var showController = {};

  showController.genreDataToHomeView = (genres) => {
    module.populateGenres(genres);
  };

  showController.daysDataToHomeView = (days) => {
    module.populateDays(days);
  };

  showController.timesDataToHomeView = (times) => {
    module.populateTimes(times);
  };

  // On Submit, query API and get filtered show list based on preferences
  $('#querySubmitButton').on('click', function(){
    module.DataModel.requestShows( (mappedData) => {
      console.log(mappedData);
      var filteredShows = module.DataModel.filterShows(['Comedy','Drama'],['Monday', 'Tuesday'], ['Evening']);
      console.log(filteredShows);
      module.populateResults(filteredShows);
    })
  });

  // On 'detail' click, pass show id to home view to display.
  $('.show-more').on('click', function(){
    var show_id = $(this).attr('value');
    // TODO: call view function to show all show data;
  });

  $('.cloud')

  module.showController = showController;

})(app);
