'use strict';

const TestGenerator = require('./lib/test-generator');
const urlForServer  = require('./lib/url-for-server');
const Results       = require('./lib/results');

module.exports = function continua11yAcceptance(config) {
  return new Continua11yAcceptance(config);
};

class Continua11yAcceptance {
  constructor(json) {
    this.testGenerator = new TestGenerator(json);
    this.testGenerator.setup();
  }

  test(server, size) {
    size = size || 'default';
    let pa11yTest = this.testGenerator[size]();
    return new Test(pa11yTest, server);
  }
}

class Test {
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

