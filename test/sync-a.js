var test = require('tape');
var nano = require('nano')('http://localhost:5984');
var path = require('path');
var sync;

module.exports = function(dbname) {
  test('create the sync function', function(t) {
    t.plan(1);
    sync = require('..')(nano.use(dbname), {
      targetPath: path.resolve(__dirname, 'target-a')
    });
    t.equal(typeof sync, 'function', 'created sync function');
  });

  test('run the sync operation', function(t) {
    t.plan(1);
    sync(function(err, folders) {
      t.ifError(err);
    });
  });
};
