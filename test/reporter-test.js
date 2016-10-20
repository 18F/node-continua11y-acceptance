'use strict';

const assert   = require('assert');
const Reporter = require('../lib/reporter');

describe('Reporter', () => {
  let NullWriter, FileWriter, reportingEnvVar;

  before(() => {
    reportingEnvVar = process.env.CONTINUA11Y_REPORTING;
  });

  after(() => {
    process.env.CONTINUA11Y_REPORTING = reportingEnvVar;
  });

  beforeEach(() => {
    process.env.CONTINUA11Y_REPORTING = undefined;
  });

  describe('isReporting', () => {
    it('when there is a CONTINUA11Y_REPORTING env var that is "false", it returns false', () => {
      process.env.CONTINUA11Y_REPORTING = 'false';
      assert.equal(new Reporter().isReporting(), false);
    });

    it('when there is a CONTINUA11Y_REPORTING env var is "true", but config is set to false, it is true', () => {
      process.env.CONTINUA11Y_REPORTING = 'true';
      assert.equal(new Reporter({report: __dirname + '/fixtures/accessibility/'}).isReporting(), true);
    });

    it('when the config is set to false, it is false', () => {
      assert.equal(new Reporter({report: false}).isReporting(), false);
    });

    it('by default it is true', () => {
      assert.equal(new Reporter().isReporting(), true);
    });
  });

  describe('writer', () => {
    let MockNullWriter = function() {
      this.isNull = true;
      this.isFile = false;
    };

    let MockFileWriter = function() {
      this.isNull = false;
      this.isFile = true;
    };

    before(() => {
      NullWriter = Reporter.NullWriter;
      FileWriter = Reporter.FileWriter;

      Reporter.NullWriter = MockNullWriter;
      Reporter.FileWriter = MockFileWriter;
    });

    after(() => {
      Reporter.NullWriter = NullWriter;
      Reporter.FileWriter = FileWriter;
    });

    it('when reporting to file, it uses the file writer', () => {
      let writer = new Reporter().writer();
      assert.equal(writer.isFile, true);
    });

    it('when not reporting, it uses the null file writer', () => {
      let writer = new Reporter({report: false}).writer();
      assert.equal(writer.isNull, true);
    });
  });

  describe('basePath', () => {
    it('is the process cwd with the directory name when not specified by the report', () => {
      assert.equal(new Reporter().basePath(), process.cwd() + '/accessibility');
    });

    it('is the config provided directory, if provided', () => {
      let basePath = new Reporter({report: __dirname + '/fixtures/accessibility'}).basePath();
      assert.equal(basePath, __dirname + '/fixtures/accessibility');
    });
  });
});
