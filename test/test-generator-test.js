'use strict';

const TestGenerator = require('../lib/test-generator');
const assert        = require('assert');

describe('TestGenerator', () => {
  const sizesConfig = require('./fixtures/config/many-sizes.json');
  let generator, pa11y;

  let pa11yConfig;
  let pa11yMock = function(config) {
    pa11yConfig = config;
  };

  before(() => {
    pa11y = TestGenerator.pa11y;
    TestGenerator.pa11y = pa11yMock;
  });

  after(() => {
    TestGenerator.pa11y = pa11y;
  });

  describe('when sizes are specified in the config file', () => {
    beforeEach(() => {
      generator = new TestGenerator(sizesConfig);
      generator.setup();
    });

    it('acts as a wrapper for generating pa11y tests based on configurations', () => {
      generator.default();
      assert.equal(pa11yConfig.page.viewport.width, 320);
      generator.mobile();
      assert.equal(pa11yConfig.page.viewport.width, 320);
      generator.tablet();
      assert.equal(pa11yConfig.page.viewport.width, 600);
      generator.desktop();
      assert.equal(pa11yConfig.page.viewport.width, 1200);
    });
  });
});

