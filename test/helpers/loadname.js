var fs = require('fs');
var path = require('path');
var reLineBreak = /\n\r?/;

module.exports = function(targetPath, targetApp, callback) {
  fs.readFile(path.join(targetPath, targetApp, 'name.txt'), 'utf8', function(err, data) {
    callback(err, (data || '').split(reLineBreak)[0]);
  });
};
