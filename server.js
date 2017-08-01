'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');
const PORT = process.env.PORT || 3000;
// const connString = 'postgres://localhost:5432/yourtube';
const connString = process.env.PG_PASSWORD;
const client = new pg.Client(connString);
client.connect();

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/newUser', function (req, res) {
  client.query(
    `INSERT INTO users (name) VALUES ($1) RETURNING *`,
    [req.body.name]
  )
  .then(function (result) {
    res.send(result.rows[0]);
  })
  .catch(function (err) {
    console.error(err);
    res.send(err);
  });
});

app.put('/updateUser', function (req, res) {
  client.query(
    `UPDATE users SET name=$1, genres=$2, days=$3, times=$4 WHERE user_id=$5 RETURNING *`,
    [req.body.name, req.body.genres, req.body.days, req.body.times, req.body.user_id]
  )
  .then(function (result) {
    res.send(result.rows[0]);
  })
  .catch(function (err) {
    console.log(req.body)
    console.error(err)
    res.send(err);
  });
});

app.get('/getUser', function (req, res) {
  console.log(req.query.user_id);
  client.query(
    `SELECT * FROM users WHERE user_id=$1`, [req.query.user_id]
  )
  .then(function (result) {
    console.log('Inside server GET success: ')
    console.log(result)
    res.send(result.rows[0]);
  })
  .catch(function (err) {
    console.log('Inside server GET error: ')
    console.error(err);
    res.send(err);
  });
});

loadDB();

function loadDB(){
  let dayArray = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  let timeArray = ['morning', 'afternoon', 'evening'];
  // create main table
  client.query(`CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, name VARCHAR NOT NULL);`)
  createGenreTable();
  createDaysTable();
  createTimesTable();

  // create tables for genre + days + times static data
  function createGenreTable() {
    client.query(`CREATE TABLE IF NOT EXISTS genres (
      genre_id SERIAL PRIMARY KEY,
      genre VARCHAR
    );`
  ).then(function (){
    console.info('Created genres table');
  });
  }

  // create days table
  function createDaysTable() {
    client.query(`CREATE TABLE IF NOT EXISTS days (
      day_id SERIAL PRIMARY KEY,
      day VARCHAR
    );`
  ).then(function (){
    console.info('Created days table');
    dayArray.forEach(function(day){insertDaysData(day);});
  });
  }

  function insertDaysData(thisDay) {
    console.log('this has been called');
    client.query(`INSERT INTO days (day) VALUES ($1) ON CONFLICT DO NOTHING RETURNING *;`,
      [ thisDay ]).then(function(){
        console.log(thisDay);
        console.info('Insert days into table');
      });
  }

  // create times table
  function createTimesTable() {
    client.query(`CREATE TABLE IF NOT EXISTS times (
      time_id SERIAL PRIMARY KEY,
      time VARCHAR
    );`
  ).then(function (){
    console.info('Created times table');
    timeArray.forEach(function(time){insertTimesData(time);});
  });
  }

  function insertTimesData(thisTime) {
    console.log('this has been called');
    client.query(`INSERT INTO times (time) VALUES ($1) ON CONFLICT DO NOTHING RETURNING *;`,
      [ thisTime ]).then(function(){
        console.log(thisTime);
        console.info('Insert times into table');
      });
  }
}

app.listen(PORT, function(){
  console.info('Listening on port: ' + PORT);
})
