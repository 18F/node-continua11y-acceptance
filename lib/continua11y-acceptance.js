'use strict';

const TestGenerator = require('./test-generator');
const TestDelegate  = require('./test-delegate');

class Continua11yAcceptance {
  constructor(json) {
    this.testGenerator = new TestGenerator(json);
    this.testGenerator.setup();
    // setup reporter as well with config
  }

  test(server, size) {
    size = size || 'default';
    let pa11yTest = this.testGenerator[size]();
    return new TestDelegate(pa11yTest, server); // pass in the reporter
  }
}

module.exports = Continua11yAcceptance;
