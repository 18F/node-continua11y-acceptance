'use strict';

const TestGenerator = require('./test-generator');
const TestDelegate  = require('./test-delegate');
const Reporter      = require('./reporter');

class Continua11yAcceptance {
  constructor(json) {
    this.testGenerator = new TestGenerator(json);
    this.testGenerator.setup();
    this.reporterWriter = new Reporter(json).writer();
  }

  test(server, size) {
    size = size || 'default';
    let pa11yTest = this.testGenerator[size]();
    return new TestDelegate(pa11yTest, server, size, this.reporterWriter);
  }
}

module.exports = Continua11yAcceptance;
