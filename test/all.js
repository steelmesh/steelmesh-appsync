var uuid = require('uuid');
var dbname = 'appsync-' + uuid.v4();

require('./prepdb')(dbname);
require('./sync-a')(dbname);
