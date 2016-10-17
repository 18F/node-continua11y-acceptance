'use strict';

const Results = require('../lib/results');
const assert  = require('assert');

describe('Results', () => {
  let data, results;
  const noErrors = require('./fixtures/data/no-errors.json');
  const withErrors = require('./fixtures/data/with-errors.json');

  describe('when there are errors', () => {
    beforeEach(() => {
      data = withErrors;
      results = new Results(data);
    });

    it('assertNoErrors raises an assertion error', () => {
      assert.throws(() => { results.assertNoErrors(); });
    });
  });

  describe('when there are no errors but there are warnings', () => {
    beforeEach(() => {
      data = noErrors;
      results = new Results(data);
    });

    it('assertNoErrors raises an assertion error', () => {
      assert.doesNotThrow(() => { results.assertNoErrors(); }, assert.AssertionError);
    });
  });

  describe('assertions by threshold', () => {
    beforeEach(() => {
      data = withErrors;
      results = new Results(data);
    });

    it('assertErrorsLessThan raises an error if the number of errors is greater than the threshold', () => {
      assert.throws(() => { results.assertErrorsLessThan(1); });
    });

    it('assertErrorsLessThan raises an error if the number errors is the same as the threshold', () => {
      assert.throws(() => { results.assertErrorsLessThan(2); });
    });

    it('assertErrorsLessThan passes if the number of errors is greater than the threshold', () => {
      assert.doesNotThrow(() => { results.assertErrorsLessThan(20); }, assert.AssertionError);
    });

    it('assertWarningsLessThan raises an error if the number of errors is greater than the threshold', () => {
      assert.throws(() => { results.assertWarningsLessThan(1); });
    });

    it('assertWarningsLessThan raises an error if the number errors is the same as the threshold', () => {
      assert.throws(() => { results.assertWarningsLessThan(8); });
    });

    it('assertWarningsLessThan passes if the number of errors is greater than the threshold', () => {
      assert.doesNotThrow(() => { results.assertWarningsLessThan(20); }, assert.AssertionError);
    });

    it('assertNoticesLessThan raises an error if the number of errors is greater than the threshold', () => {
      assert.throws(() => { results.assertNoticesLessThan(1); });
    });

    it('assertNoticesLessThan raises an error if the number errors is the same as the threshold', () => {
      assert.throws(() => { results.assertNoticesLessThan(107); });
    });

    it('assertNoticesLessThan passes if the number of errors is greater than the threshold', () => {
      assert.doesNotThrow(() => { results.assertNoticesLessThan(110); }, assert.AssertionError);
    });
  });
});
