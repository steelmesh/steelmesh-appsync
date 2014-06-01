/* jshint node: true */
'use strict';

var async = require('async');
var attachmate = require('attachmate');
var debug = require('debug')('steelmesh-appsync');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var semver = require('semver');

/**
  # steelmesh-appsync

  This module is responsible for querying a remote CouchDB db instance and
  downloading any updated apps down to the local filesystem.

  ## Example Usage

  <<< examples/sync.js
**/

module.exports = function(db, opts) {
  var baseUrl = db.config.url + '/' + db.config.db;
  var targetPath = (opts || {}).targetPath || process.cwd();

  function compareAndSync(appFolder, pkg, app, callback) {
    var version = (pkg || {}).version;

    db.get(app.id, function(err, body) {
      if (err) {
        return callback(err);
      }

      // if we have a version and the version not greater than the local
      // version do nothing (but don't error)
      if (version && (! semver.gt(body.version, version))) {
        return callback();
      }

      mkdirp(appFolder, function(err) {
        if (err) {
          return callback(err);
        }

        attachmate.download(baseUrl + '/' + app.id, appFolder, callback);
      });
    });
  }

  function getPackageData(appFolder, callback) {
    var pkg;

    fs.exists(appFolder, function(exists) {
      if (! exists) {
        return callback();
      }

      try {
        pkg = require(path.resolve(appFolder, 'package.json'));
      }
      catch (e) {
        return callback(new Error('Cannot sync - package.json missing or invalid in ' + appFolder));
      }

      callback(null, pkg);
    });
  }

  function sync(app, callback) {
    var appFolder = path.resolve(targetPath, app.id);

    getPackageData(appFolder, function(err, pkg) {
      if (err) {
        return callback(err);
      }

      compareAndSync(appFolder, pkg, app, callback);
    });
  }

  return function(callback) {
    // list the items in the db
    db.list(function(err, body) {
      if (err) {
        return callback(err);
      }

      async.map(body.rows || [], sync, callback);
    });
  };
};
