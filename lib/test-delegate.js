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
        results = new Results(results);
        // create report and write to file system ??
        callback(null, results);
      }
    });
  }
}

module.exports = TestDelegate;
