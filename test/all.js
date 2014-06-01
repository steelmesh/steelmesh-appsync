var uuid = require('uuid');
var dbname = 'appsync-' + uuid.v4();

require('./prepdb')(dbname);
require('./cleantargets')(dbname);
require('./sync-a')(dbname);
require('./sync-b')(dbname);
