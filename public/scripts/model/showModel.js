'use strict';

var app = app || {};

(function(module){
  var DataModel = {};
  DataModel.all = [];

  DataModel.requestShows = function(callback){
    $.get('http://api.tvmaze.com/schedule')
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
      callback(mappedData);
    }, function(err){
      console.error(err);
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
      var flag = false;
      days.forEach(function(day){
        if(show.days.includes(day)){
          flag = true;
        }
      });
      return flag;
    });
    filteredData = filteredData.filter(function(show){
      var flag = false;
      genres.forEach(function(genre){
        if(show.genres.includes(genre)){
          flag = true;
        }
      });
      return flag;
    });

    filteredData = filteredData.filter(function(show){
      var flag = false;
      times.forEach(function(time){
        if(show.timeframe.includes(time)){
          flag = true;
        }
      });
      return flag;
    });
    return filteredData;
  };

  // get table data from database
  DataModel.getGenresData = (callback) => {
    $.ajax({
      url: '/getGenres',
      method: 'GET'
    })
    .then((results) => {
      callback(results);
    }), (err) => console.error(err);
  }

  DataModel.getTimesData = (callback) => {
    $.ajax({
      url: '/getTimes',
      method: 'GET'
    })
    .then((results) => {
      callback(results);
    }), (err) => console.error(err);
  }

  DataModel.getDaysData = (callback) => {
    $.ajax({
      url: '/getDays',
      method: 'GET'
    })
    .then((results) => {
      callback(results);
    }), (err) => console.error(err);
  }

  DataModel.getPreferencesData = function(callback){
    $.ajax({
      url: '/getPreferences',
      method: 'GET',
    }).then(function(results){
      console.log(results);
      callback(results);
    }, function(error){
      console.log(error);
    });
  }
  
  DataModel.getGenresData(function(results){
    module.showController.genreDataToHomeView(results);
  });

  DataModel.getDaysData(function(results){
    module.showController.daysDataToHomeView(results);
  });

  DataModel.getTimesData(function(results){
    module.showController.timesDataToHomeView(results);
  });


  module.DataModel = DataModel;
})(app);
