'use strict';

const urlForServer  = require('./url-for-server');
const Results       = require('./results');

class TestDelegate {
  constructor(pa11yTest, server, size, reportWriter) {
    this.server       = server;
    this.pa11yTest    = pa11yTest;
    this.size = size;
    this.reportWriter = reportWriter;
  }

  run(path, callback) {
    let url = urlForServer(this.server, path);
    this.pa11yTest.run(url, (err, results) => {
      if (err) { callback(err); }
      else {
        this.report(path, results, callback);
      }
    });
  }

  report(path, rawResults, callback) {
    let results = new Results(rawResults);
    let data = {
       path: path,
       size: this.size,
       results: results.asJSON()
    };

    this.reportWriter.write(data, (err) => {
      callback(err, results);
    });
  }
}

module.exports = TestDelegate;
