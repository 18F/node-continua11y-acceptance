'use strict';

const urlForServer  = require('./url-for-server');
const Results       = require('./results');

class TestDelegate {
  constructor(pa11yTest, server, size) {
    this.server = server;
    this.pa11yTest = pa11yTest;
    this.size = size;
  }

  run(path, callback) {
    let url = urlForServer(this.server, path);
    this.pa11yTest.run(url, (err, results) => {
      if (err) { callback(err); }
      else {
        results = new Results(results);
        // let data = {
        //   path: path,
        //   size: this.size,
        //   results: results.toJSON()
        // }
        // create report and write to file system ??
        callback(null, results);
      }
    });
  }

  report(path, callback, rawResults) {
    let results = new Results(rawResults);
    let data = {
       path: path,
       size: this.size,
       results: results.toJSON()
    };
    callback(null, results);
  }
}

module.exports = TestDelegate;
