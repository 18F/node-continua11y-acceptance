'use strict';

const assert          = require('assert');
const express         = require('express');
const fs              = require('fs');

const config          = require('./fixtures/config/many-sizes.json');
const goodWebPage     = fs.readFileSync(__dirname + '/fixtures/html/good.html').toString();
const badWebPage      = fs.readFileSync(__dirname + '/fixtures/html/bad.html').toString();

const contintua11yAcceptance = require('../index.js');

describe('full acceptance flow', () => {
  let server, mobileTest, tabletTest, desktopTest;

  describe('when the page has no errors', () => {
    beforeEach((done) => {
      let app = express();

      app.get('/', (req, res) => {
        res.send(goodWebPage);
        res.end();
      });

      server = app.listen(3344, () => {
        mobileTest  = contintua11yAcceptance(config).test(server, 'mobile');
        tabletTest  = contintua11yAcceptance(config).test(server, 'tablet');
        desktopTest = contintua11yAcceptance(config).test(server, 'desktop');
        done();
      });
    });

    afterEach((done) => {
      server.close(() => { done(); });
    });

    it('should assert no errors in in mobile', (done) => {
      mobileTest.run('/', (err, results) => {
        if (err) { done(err); }
        results.assertNoErrors();
        done();
      });
    });

    it('should assert no errors in tablet', (done) => {
      tabletTest.run('/', (err, results) => {
        if (err) { done(err); }
        results.assertNoErrors();
        done();
      });
    });

    it('should assert no errors in desktop', (done) => {
      desktopTest.run('/', (err, results) => {
        if (err) { done(err); }
        results.assertNoErrors();
        done();
      });
    });

    it('should assert less than a certain number of warnings in mobile', (done) => {
      mobileTest.run('/', (err, results) => {
        if (err) { done(err); }
        results.assertWarningsLessThan(1);
        done();
      });
    });

    it('should assert less than a certain number of warnings in tablet', (done) => {
      tabletTest.run('/', (err, results) => {
        if (err) { done(err); }
        results.assertWarningsLessThan(1);
        done();
      });
    });

    it('should assert less than a certain number of warnings in desktop', (done) => {
      desktopTest.run('/', (err, results) => {
        if (err) { done(err); }
        results.assertWarningsLessThan(1);
        done();
      });
    });
  });

  describe('when the page has errors', () => {
    beforeEach((done) => {
      let app = express();

      app.get('/', (req, res) => {
        res.send(badWebPage);
        res.end();
      });

      server = app.listen(3344, () => {
        mobileTest  = contintua11yAcceptance(config).test(server, 'mobile');
        tabletTest  = contintua11yAcceptance(config).test(server, 'tablet');
        desktopTest = contintua11yAcceptance(config).test(server, 'desktop');
        done();
      });
    });

    afterEach((done) => {
      server.close(() => { done(); });
    });

    it('should assert there are errors in mobile', (done) => {
      mobileTest.run('/', (err, results) => {
        if (err) { done(err); }
        assert.throws(() => { results.assertNoErrors(); }, assert.AssertionError);
        results.assertErrorsLessThan(3);
        done();
      });
    });

    it('should assert there are in tablet', (done) => {
      tabletTest.run('/', (err, results) => {
        if (err) { done(err); }
        assert.throws(() => { results.assertNoErrors(); }, assert.AssertionError);
        results.assertErrorsLessThan(3);
        done();
      });
    });

    it('should assert there are in desktop', (done) => {
      desktopTest.run('/', (err, results) => {
        if (err) { done(err); }
        assert.throws(() => { results.assertNoErrors(); }, assert.AssertionError);
        results.assertErrorsLessThan(3);
        done();
      });
    });
  });
});