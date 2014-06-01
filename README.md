# steelmesh-appsync

This module is responsible for querying a remote CouchDB db instance and
downloading any updated apps down to the local filesystem.


[![NPM](https://nodei.co/npm/steelmesh-appsync.png)](https://nodei.co/npm/steelmesh-appsync/)

[![Build Status](https://img.shields.io/travis/steelmesh/steelmesh-appsync.svg?branch=master)](https://travis-ci.org/steelmesh/steelmesh-appsync) [![unstable](https://img.shields.io/badge/stability-unstable-yellowgreen.svg)](https://github.com/badges/stability-badges) 

## Example Usage

```js
var path = require('path');
var db = require('nano')('http://localhost:5984/');

// create the application synchronizer
var appsync = require('steelmesh-appsync')(db.use('steelmesh'), {
  targetPath: path.resolve(__dirname, 'apps')
});

// perform the sync operation
appsync(function(err) {
  if (err) {
    return console.error('Unable to synchronize apps: ', err);
  }

  console.log('applications sync complete');
});

```

## License(s)

### Apache 2.0

Copyright 2014 Damon Oehlman <damon.oehlman@gmail.com>

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
