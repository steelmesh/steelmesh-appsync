var test = require('tape');
var nano = require('nano')('http://localhost:5984');
var path = require('path');
var publisher = require('steelmesh-publish');

module.exports = function(dbname) {
  test('create the db', function(t) {
    t.plan(2);
    nano.db.create(dbname, function(err, body) {
      t.ifError(err);
      t.deepEqual(body, { ok: true }, 'created');
    });
  });

  test('upload sample a', function(t) {
    var publish = publisher(nano.use(dbname), {
      srcPath: path.resolve(__dirname, 'upstream', 'a')
    });

    t.plan(1);
    publish(function(err) {
      t.ifError(err);
    });
  });

  test('upload sample b', function(t) {
    var publish = publisher(nano.use(dbname), {
      srcPath: path.resolve(__dirname, 'upstream', 'b')
    });

    t.plan(1);
    publish(function(err) {
      t.ifError(err);
    });
  });

  test('upload sample c', function(t) {
    var publish = publisher(nano.use(dbname), {
      srcPath: path.resolve(__dirname, 'upstream', 'c')
    });

    t.plan(1);
    publish(function(err) {
      t.ifError(err);
    });
  });
};
