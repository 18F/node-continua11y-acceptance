'use strict';

const urlForServer  = require('../lib/url-for-server');
const assert        = require('assert');
const http          = require('http');

describe('urlForServer', () => {
  let server;

  describe('when the server is local', () => {
    beforeEach((done) => {
      server = http.createServer(() => {});
      server.listen(3344, () => { done(); });
    });

    afterEach((done) => {
      server.close(() => {
        done();
      });
    });

    it('gets the right address', () => {
      assert.equal(urlForServer(server, '/go-team'), 'http://localhost:3344/go-team');
    });
  });

  describe('when the server is given an IP', () => {
    beforeEach((done) => {
      server = http.createServer(() => {});
      server.listen(3344, '127.0.0.1', () => { done(); });
    });

    afterEach((done) => {
      server.close(() => {
        done();
      });
    });

    it('gets the right address', () => {
      assert.equal(urlForServer(server, '/go-team'), 'http://127.0.0.1:3344/go-team');
    });
  });
});
