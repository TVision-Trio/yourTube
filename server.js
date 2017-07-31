'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');
const connString = 'postgress://localhost:5432/yourtube';
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

app.listen(PORT, function(){
  console.info('Listening on port: ' + PORT);
})
