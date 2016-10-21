'use strict';

const rimraf        = require('rimraf');

const TestGenerator = require('./test-generator');
const TestDelegate  = require('./test-delegate');
const ReportConfig  = require('./report-config');

class Continua11yAcceptance {
  constructor(json) {
    this.testGenerator = new TestGenerator(json);
    this.testGenerator.setup();
    this.reportConfig = new ReportConfig(json);
  }

  test(server, size) {
    size = size || 'default';
    let pa11yTest = this.testGenerator[size]();
    return new TestDelegate(pa11yTest, server, size, this.reportConfig.writer());
  }

  clearReport(callback) {
    let reportingPath = this.reportConfig.basePath();
    rimraf(reportingPath, callback);
  }
}

module.exports = Continua11yAcceptance;
