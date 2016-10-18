'use strict';

const ConfigGenerator  = require('../lib/config-generator');
const assert          = require('assert');

describe('ConfigGenerator', () => {
  const sizesConfig = require('./fixtures/config/many-sizes.json');
  const noSizesConfig = require('./fixtures/config/no-sizes.json');

  let generator;

  describe('when sizes are specified', () => {
    beforeEach(() => {
      generator = new ConfigGenerator(sizesConfig);
      generator.setup();
    });

    it('the default is the first one', () => {
      let viewport = generator.default().page.viewport;
      assert.equal(viewport.width, 320);
      assert.equal(viewport.height, 480);
    });

    it('it generates method names for each', () => {
      assert.deepEqual(generator.mobile().page.viewport, {width: 320, height: 480});
      assert.deepEqual(generator.tablet().page.viewport, {width: 600, height: 900});
      assert.deepEqual(generator.desktop().page.viewport, {width: 1200, height: 800});
    });

    it('has the name of the sizes', () => {
      assert.deepEqual(generator.sizeNames(), ['default', 'mobile', 'tablet', 'desktop']);
    });

    it('has other custom config bits', () => {
      assert.deepEqual(generator.default().page.headers.Cookie, 'foo=bar');
      assert.deepEqual(generator.mobile().page.headers.Cookie, 'foo=bar');
      assert.deepEqual(generator.tablet().page.headers.Cookie, 'foo=bar');
      assert.deepEqual(generator.desktop().page.headers.Cookie, 'foo=bar');
    });
  });

  describe('no sizes specified', () => {
    beforeEach(() => {
      generator = new ConfigGenerator(noSizesConfig);
      generator.setup();
    });

    it('has a default size', () => {
      let viewport = generator.default().page.viewport;
      assert.equal(viewport.width, 1024);
      assert.equal(viewport.height, 768);
    });

    it('has other custom config bits', () => {
      assert.deepEqual(generator.default().page.headers.Cookie, 'foo=bar');
    });

    it('sizeNames includes default', () => {
      assert.deepEqual(generator.sizeNames(), ['default']);
    });
  });
});

