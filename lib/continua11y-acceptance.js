'use strict';

const TestGenerator = require('./test-generator');
const TestDelegate  = require('./test-delegate');

class Continua11yAcceptance {
  constructor(json) {
    this.testGenerator = new TestGenerator(json);
    this.testGenerator.setup();
  }

  test(server, size) {
    size = size || 'default';
    let pa11yTest = this.testGenerator[size]();
    return new TestDelegate(pa11yTest, server);
  }
}

module.exports = Continua11yAcceptance;
