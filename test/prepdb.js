var test = require('tape');
var nano = require('nano')('http://localhost:5984');

module.exports = function(dbname) {
  test('create the db', function(t) {
    t.plan(2);
    nano.db.create(dbname, function(err, body) {
      t.ifError(err);
      t.deepEqual(body, { ok: true }, 'created');
    });
  });
};
