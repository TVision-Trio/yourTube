'use strict';

var app = app || {};

(function(module){
  var DataModel = {};
  DataModel.all = [];

  DataModel.requestShows = (callback) => {
    $.get('https://api.tvmaze.com/schedule')
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
      if(callback) callback(mappedData);
    }, function(err){
      console.error(err);
    });
  };


  DataModel.filterShows = function(genres, days, times, callback){
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
    console.log(filteredData);
    callback(filteredData);
  };

  // Convert preferences from numbers to words
  DataModel.convertToWords = function(timePref, dayPref, genrePref, callback){
    var wordsArray = [];
    // Get all info from time preference table
    $.ajax({
      url:'/getTimes',
      method: 'GET'
    }).then(function(timeResults){
      // As a callback:
      var times = toWordsHelp(timePref, 'time', timeResults);
      $.ajax({
        url:'/getDays',
        method: 'GET'
      }).then(function(dayResults){
        var days = toWordsHelp(dayPref, 'day', dayResults);
        $.ajax({
          url:'/getGenres',
          method: 'GET'
        }).then(function(genreResults){
          var genres = toWordsHelp(genrePref, 'genre', genreResults);
          callback([times, days, genres]);
          return [times, days, genres];
        })
      })
    }, function(error){
      console.log('Failed at getting Words from Database');
      console.error(error);
    });
  }

  function toWordsHelp(arrayOfPreferences, db_line, results) {
    var wordsArray = [];
    arrayOfPreferences.forEach(function(pref){
    // For each thing in the stuff from tableName
      results.forEach(function(result){
        // construct the table_id and the column name for the table
        var id = db_line + '_id';
        // if there are the same:
        if (pref === result[id]){
          // add the thing from the tableName info to wordsArray
          wordsArray.push(result[db_line]);
        }
      })
    })
    return wordsArray
  }

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

  DataModel.setGenresData = (genre) => {
    $.ajax({
      url: '/setGenres',
      method: 'PUT',
      data: {
        genre: genre,
      }
    })
    .then((data) => {
    });
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

  DataModel.requestShows((shows) => {
    return DataModel.getGenres(shows).forEach((genre) => {
      DataModel.setGenresData(genre);
    })
  });

  DataModel.getGenresData((results) => {
    module.showController.genreDataToHomeView(results);
  });

  DataModel.getDaysData((results) => {
    module.showController.daysDataToHomeView(results);
  });

  DataModel.getTimesData((results) => {
    module.showController.timesDataToHomeView(results);
  });

  module.DataModel = DataModel;
})(app);
