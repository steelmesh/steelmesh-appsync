var test = require('tape');
var nano = require('nano')('http://localhost:5984');
var path = require('path');
var targetPath = path.resolve(__dirname, 'target-b');
var loadName = require('./helpers/loadname');
var sync;

module.exports = function(dbname) {
  test('create the sync function', function(t) {
    t.plan(1);
    sync = require('..')(nano.use(dbname), {
      targetPath: targetPath
    });
    t.equal(typeof sync, 'function', 'created sync function');
  });

  test('run the sync operation', function(t) {
    t.plan(3);
    sync(function(err, folders) {
      t.ifError(err);
      t.ok(Array.isArray(folders), 'got folders info');
      t.equal(folders.length, 3, 'synced 3 folders');
    });
  });

  test('a synced', function(t) {
    t.plan(2);
    loadName(targetPath, 'a', function(err, name) {
      t.ifError(err);
      t.equal(name, 'Fred', 'got expected contents');
    });
  });

  test('b synced', function(t) {
    t.plan(2);
    loadName(targetPath, 'b', function(err, name) {
      t.ifError(err);
      t.equal(name, 'Fred', 'got expected contents');
    });
  });

  test('c not synced', function(t) {
    t.plan(2);
    loadName(targetPath, 'c', function(err, name) {
      t.ifError(err);
      t.equal(name, 'Bob', 'got expected contents');
    });
  });
};
