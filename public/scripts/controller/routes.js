'use strict';

var app = app || {};

page('/', index.html);
page('/main', app.initHome);
// page('/results', )
// page('/about', );
page();


// LANDING PAGE
  // if local storage exists, redirect
  // this should be the default view on load
  // TODO: index.html needs to default to only the landing section
