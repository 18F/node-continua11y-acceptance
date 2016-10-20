'use strict';

class Reporter {
  constructor(rawConfig) {
    this.config = rawConfig || {};
  }

  writer() {
    let WriterClass = this.isReporting() ? Reporter.FileWriter : Reporter.NullWriter;
    return new WriterClass(this.basePath());
  }

  isReporting() {
    if (process.env.CONTINUA11Y_REPORTING === 'false') { return false; }
    if (process.env.CONTINUA11Y_REPORTING === 'true') { return true; }
    if (this.configedReport() === false) { return false; }
    return true;
  }

  basePath() {
    let path = this.configedReport();
    if (path === true) { path = undefined; }
    return path || this.defaultBasePath();
  }

  defaultBasePath() {
    return process.cwd() + '/accessibility';
  }

  configedReport() {
    return this.config.report;
  }
}

class NullWriter {
  constructor() {}
  write(page, callback) {
    callback();
  }
}

class FileWriter {
  constructor(path) {
    this.path = path;
  }

  write(data, callback) {
    // get path from data
    // write data to file with callback
  }
}

Reporter.NullWriter = NullWriter;
Reporter.FileWriter = FileWriter;

module.exports = Reporter;
