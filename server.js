'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');
const PORT = process.env.PORT || 3000;
const connString = process.env.PG_PASSWORD;
const client = new pg.Client(connString);
client.connect();

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

loadDB();

// put from model
app.put('/setGenres', (req, res) => {
  client.query(`INSERT INTO genres (genre) VALUES ($1) ON CONFLICT DO NOTHING;`,
  [req.body.genre])
  .then(() => {
    res.send('insert genres complete')
  })
  .catch((err) => {
    console.error(err);
  });
});

app.post('/newUser', function(req, res) {
  client.query(
      `INSERT INTO users (username, name) VALUES ($1, $2) RETURNING *;`, [
        req.body.username,
        req.body.name
      ]
    )
    .then(function(result) {
      client.query(`INSERT INTO genre_preferences (user_id) VALUES ($1) RETURNING *;`,[result.rows[0].user_id]);
      client.query(`INSERT INTO time_preferences (user_id) VALUES ($1) RETURNING *;`,[result.rows[0].user_id]);
      client.query(`INSERT INTO day_preferences (user_id) VALUES ($1) RETURNING *;`,[result.rows[0].user_id]);
      res.send(result.rows[0]);
    })
    .catch(function(err) {
      console.log('In server error');
      console.error(err);
      res.send(err);
    });
});

app.put('/updateUser', function(req, res) {
  client.query(
      `UPDATE users SET name=$1, genres=$2, days=$3, times=$4 WHERE user_id=$5 RETURNING *;`, [
        req.body.name,
        req.body.genres,
        req.body.days,
        req.body.times,
        req.body.user_id
      ]
    )
    .then(function(result) {
      res.send(result.rows[0]);
    })
    .catch(function(err) {
      console.log(req.body)
      console.error(err)
      res.send(err);
    });
});

app.get('/getUser', function(req, res) {
  console.log(req.query.user_id);
  client.query(
      `SELECT * FROM users WHERE user_id=$1;`, [req.query.user_id]
    )
    .then(function(result) {
      console.log('Inside server GET success: ')
      console.log(result)
      res.send(result.rows[0]);
    })
    .catch(function(err) {
      console.log('Inside server GET error: ')
      console.error(err);
      res.send(err);
    });
});

app.get('/getUsers', function(req, res) {
  client.query(
      `SELECT * FROM users;`
    )
    .then(function(result) {
      console.log('Inside server GET success: ')
      console.log(result)
      res.send(result.rows[0]);
    })
    .catch(function(err) {
      console.log('Inside server GET error: ')
      console.error(err);
      res.send(err);
    });
});

// get data from tables

app.get('/getGenres', (req, res) => {
  client.query(
      `SELECT genre FROM genres;`
    )
    .then( (result) => {
      res.send(result.rows);
    })
    .catch( (err) => {
      res.send(err);
    });
});

app.get('/getDays', (req, res) => {
  client.query(
      `SELECT day FROM days;`
    )
    .then( (result) => {
      res.send(result.rows);
    })
    .catch( (err) => {
      res.send(err);
    });
});

app.get('/getTimes', (req, res) => {
  client.query(
      `SELECT time FROM times;`
    )
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.send(err);
    });
});

function loadDB() {

  //TODO: do this as a check
  client.query('DROP TABLE IF EXISTS users, genres, days, times, time_preference, day_preference, genre_preference');

  const DAY_ARRAY = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];
  const TIME_ARRAY = ['Morning', 'Afternoon', 'Evening'];
  // const GENRE_ARRAY = [];

  createUsersTable();
  createGenresTable();
  createDaysTable();
  createTimesTable();
  createTimePrefTable();
  createDayPrefTable();
  createGenrePrefTable()

  // TODO: DRY refactor needed
  function createUsersTable() {
    client.query(`CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR NOT NULL UNIQUE,
      name VARCHAR);`)
  }

  // create tables for genre
  function createGenresTable() {
    client.query(`CREATE TABLE IF NOT EXISTS genres (
      genre_id SERIAL PRIMARY KEY,
      genre VARCHAR UNIQUE
    );`).then(function() {
      console.info('Created genres table');
    });
  }

  // create days table
  function createDaysTable() {
    client.query(`CREATE TABLE IF NOT EXISTS days (
    day_id SERIAL PRIMARY KEY,
    day VARCHAR UNIQUE
  );`).then(function() {
    console.info('Created days table');
    DAY_ARRAY.forEach(function(day) {
      insertDaysData(day);
    });
  });
  }

  function insertDaysData(thisDay) {
    client.query(`INSERT INTO days (day) VALUES ($1) ON CONFLICT DO NOTHING RETURNING *;`, [thisDay]);
  }

  // create times table
  function createTimesTable() {
    client.query(`CREATE TABLE IF NOT EXISTS times (
    time_id SERIAL PRIMARY KEY,
    time VARCHAR UNIQUE
  );`).then(function() {
    console.info('Created times table');
    TIME_ARRAY.forEach(function(time) {
      insertTimesData(time);
    });
  });
  }

  function insertTimesData(thisTime) {
    client.query(`INSERT INTO times (time) VALUES ($1) ON CONFLICT DO NOTHING RETURNING *;`, [thisTime]);
  }

  function createTimePrefTable(){
    client.query(`CREATE TABLE IF NOT EXISTS time_preferences (
    id SERIAL PRIMARY KEY,
    time_id VARCHAR,
    user_id VARCHAR UNIQUE
  );`).then(function() {
    console.info('Created Times Pref table');
    TIME_ARRAY.forEach(function(time) {
      insertTimesData(time);
    });
  });
  }

  function createDayPrefTable(){
    client.query(`CREATE TABLE IF NOT EXISTS day_preferences (
    id SERIAL PRIMARY KEY,
    day_id VARCHAR,
    user_id VARCHAR UNIQUE
  );`).then(function() {
    console.info('Created Days Pref table');
    TIME_ARRAY.forEach(function(time) {
      insertTimesData(time);
    });
  });
  }

  function createGenrePrefTable(){
    client.query(`CREATE TABLE IF NOT EXISTS genre_preferences (
    id SERIAL PRIMARY KEY,
    genre_id VARCHAR,
    user_id VARCHAR UNIQUE
  );`).then(function() {
    console.info('Created Genre Pref table');
    TIME_ARRAY.forEach(function(time) {
      insertTimesData(time);
    });
  });
  }




}
app.listen(PORT, function() {
  console.info('Listening on port: ' + PORT);
})
