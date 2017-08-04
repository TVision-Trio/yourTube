'use strict';

var app = app || {};

page('/', 'index.html');
page('/main', app.showController.initMain);
page('/about', app.initAbout);
// page('/results', app.initResults);
page();


// LANDING PAGE
  // if local storage exists, redirect
  // this should be the default view on load
  // TODO: index.html needs to default to only the landing section
