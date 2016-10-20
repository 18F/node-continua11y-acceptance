'use strict';

const urlForServer  = require('./url-for-server');
const Results       = require('./results');

class TestDelegate {
  constructor(pa11yTest, server) {
    this.server = server;
    this.pa11yTest = pa11yTest;
  }

  run(path, callback) {
    let url = urlForServer(this.server, path);
    this.pa11yTest.run(url, (err, results) => {
      if (err) { callback(err); }
      else {
        callback(null, new Results(results));
      }
    });
  }
}

module.exports = TestDelegate;
