'use strict';

var app = app || {};
var queryString = 'http://api.tvmaze.com/schedule';

(function(module){
  // API ajax call on the query string.
  var DataModel = {};
  DataModel.all = [];

  DataModel.requestShows = function(callback){
    $.get(queryString)
    .then(function(data){
      var mappedData = data.map(function(showObject){

        var time = parseInt(showObject.show.schedule.time.slice(0,2));
        var timeframe;
        if (time < 12) {
          timeframe = 'Morning';
        } else if (time > 18){
          timeframe = 'Evening';
        } else {
          timeframe = 'Afternoon';
        }

        return {
          show_id: showObject.show.id,
          title: showObject.show.name,
          type: showObject.show.type,
          language: showObject.show.language,
          genres: showObject.show.genres,
          days: showObject.show.schedule.days,
          times: showObject.show.schedule.time,
          rating: showObject.show.rating,
          network: showObject.show.network.name,
          summary: showObject.show.summary,
          timeframe: timeframe
        };
      });
      DataModel.all = mappedData;
      callback();
    }, function(error){
      console.error(error);
    });
  };

  // Get genres from JSON to include in passed data.
  DataModel.getGenres = function(shows){
    var genreArray = shows.map(function(show){
      var genres = show.genres;
      genres.push(show.type);
      return genres;
    }).reduce(function(accu, array){
      return accu.concat(array);
    },[]).reduce(function(accu, genre){
      if (!accu.includes(genre)){
        accu.push(genre);
      }
      return accu;
    },[]);
    return genreArray;
  };


  DataModel.filterShows = function(genres, days, times){
    var filteredData = [];
    // Filter to only shows that are on prefered days
    filteredData = DataModel.all.filter(function(show){
      var counter = false;
      days.forEach(function(day){
        if(show.days.includes(day)){
          counter = true;
        }
      });
      return counter;
    });
    filteredData = filteredData.filter(function(show){
      var counter = false;
      genres.forEach(function(genre){
        if(show.genres.includes(genre)){
          counter = true;
        }
      });
      return counter;
    });

    filteredData = filteredData.filter(function(show){
      var counter = false;
      times.forEach(function(time){
        if(show.timeframe.includes(time)){
          counter = true;
        }
      });
      return counter;
    });
    return filteredData;
  };

  module.DataModel = DataModel;
})(app);
