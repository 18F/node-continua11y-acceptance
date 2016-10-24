'use strict';

const assert = require('assert');

class Results {
  constructor(data) {
    this.data = data;
  }

  assertNoErrors() {
    assert(this.errors().length === 0);
  }

  assertErrorsLessThan(threshold) {
    assert(this.errors().length < threshold);
  }

  assertWarningsLessThan(threshold) {
    assert(this.warnings().length < threshold);
  }

  assertNoticesLessThan(threshold) {
    assert(this.notices().length < threshold);
  }

  errors() {
    return this.getByType('error');
  }

  warnings() {
    return this.getByType('warning');
  }

  notices() {
    return this.getByType('notice');
  }

  asJSON() {
    return {
      errors: this.errors(),
      warnings: this.warnings(),
      notices: this.notices()
    };
  }

  getByType(type) {
    return this.data.filter((incident) => { return incident.type === type; });
  }
}

module.exports = Results;
