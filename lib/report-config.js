'use strict';

const FileWriter = require('./file-writer');

class ReportConfig {
  constructor(rawConfig) {
    this.config = rawConfig || {};
  }

  writer() {
    let WriterClass = this.isReporting() ? ReportConfig.FileWriter : ReportConfig.NullWriter;
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

ReportConfig.NullWriter = NullWriter;
ReportConfig.FileWriter = FileWriter;

module.exports = ReportConfig;
