'use strict';

var app = app || {};
var testQuery = 'http://api.tvmaze.com/schedule';

(function(module){
// API ajax call on the query string.
  function requestShows(){
    $.get(testQuery)
    .then(function(data){
      var mappedData = data.map(function(showObject){
        return {
          title: showObject.show.name,
          type: showObject.show.type,
          language: showObject.show.language,
          genres: showObject.show.genres,
          days: showObject.show.schedule.days,
          times: showObject.show.schedule.time,
          rating: showObject.show.rating,
          network: showObject.show.network.name,
          summary: showObject.show.summary
        };
      });
    }, function(error){
      console.error(error);
    });
  };


  // TODO: Get genres from JSON to include in passed data.
  function getGenres(shows){
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

  requestShows();
})(app);
