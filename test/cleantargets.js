var async = require('async');
var test = require('tape');
var path = require('path');
var rimraf = require('rimraf');

module.exports = function(dbname) {
  test('clean the target-a folder', function(t) {
    var targetPaths = ['a', 'b', 'c'].map(function(subpath) {
      return path.resolve(__dirname, 'target-a', subpath);
    });

    t.plan(1);
    async.forEach(targetPaths, rimraf, function(err) {
      t.ifError(err);
    });
  });

  test('clean the target-b folder', function(t) {
    var targetPaths = ['a', 'b'].map(function(subpath) {
      return path.resolve(__dirname, 'target-b', subpath);
    });

    t.plan(1);
    async.forEach(targetPaths, rimraf, function(err) {
      t.ifError(err);
    });
  });
};
