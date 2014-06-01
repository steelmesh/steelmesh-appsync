var path = require('path');
var db = require('nano')('http://localhost:5984/');

// create the application synchronizer
var appsync = require('../')(db.use('steelmesh'), {
  targetPath: path.resolve(__dirname, 'apps')
});

// perform the sync operation
appsync(function(err) {
  if (err) {
    return console.error('Unable to synchronize apps: ', err);
  }

  console.log('applications sync complete');
});
