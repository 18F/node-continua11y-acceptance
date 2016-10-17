'use strict';

const pa11y   = require('pa11y');
const Results = require('./lib/results');

function testDesktop(server, path, callback) {
  let test = generateTest(desktopSize);
  runTest(test, urlFor(server, path), callback);
}

function testMobile(server, path, callback) {
  let test = generateTest(desktopSize);
  runTest(test, urlFor(server, path), callback);
}

function generateTest(size, options) {
  options = options || {};
  return pa11y({
    page: { viewport: size }
  });
}

function urlFor(server, path) {
  let port = server.address().port;
  let host = server.address().address;
  if (host === '::') {
    host = 'localhost';
  }

  return 'http://' + host + ':' + port + path;
}

function runTest(test, url, callback) {
  test.run(url, (err, results) => {
    if (err) { throw err; }
    callback(new Results(results));
  });
}

let mobileSize = {
  width: 320,
  height: 400
};

let desktopSize = {
  width: 1200,
  height: 800
};

module.exports = {
  Results: Results,
  generateTest: generateTest,
  runTest: runTest,
  mobileSize: mobileSize,
  desktopSize: desktopSize,
  testDesktop: testDesktop,
  testMobile: testMobile
};

