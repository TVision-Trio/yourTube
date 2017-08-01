'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');
const PORT = process.env.PORT || 3000;
const connString = 'postgres://localhost:5432/yourtube';
// const connString = process.env.PG_PASSWORD;
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
  })
})

loadDB();
function loadDB(){
  client.query(`CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, name VARCHAR NOT NULL, preferences VARCHAR);`)
}


app.listen(PORT, function(){
  console.info('Listening on port: ' + PORT);
})
