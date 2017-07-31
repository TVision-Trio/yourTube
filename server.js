'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');
const connString = 'postgres://localhost:5432/yourtube';
// const connString = process.env.PG_PASSWORD;
const client = new pg.Client(connString);
client.connect();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/newUser', function(request, response) {
  client.query(`INSERT INTO users (name) VALUES ($1);`, [request.body.name])
});

loadDB();
function loadDB(){
  client.query(`CREATE TABLE IF NOT EXISTS users
    (user_id SERIAL PRIMARY KEY, name VARCHAR NOT NULL, preferences VARCHAR);`);
}


app.listen(PORT, function(){
  console.info('Listening on port: ' + PORT);
})
