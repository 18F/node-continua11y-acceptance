'use strict';

const pa11y = require('pa11y');
const ConfigGenerator = require('./config-generator');

class TestGenerator {
  constructor(config) {
    this.configs = new ConfigGenerator(config);
    this.configs.setup();
  }

  setup() {
    this.configs.sizeNames().forEach((methodName) => {
      this[methodName] = () => {
        let config = this.configs[methodName]();
        return this.forConfig(config);
      };
    });
  }

  forConfig(config) {
    config = config || {};
    return TestGenerator.pa11y(config);
  }
}

TestGenerator.pa11y = pa11y;

module.exports = TestGenerator;
