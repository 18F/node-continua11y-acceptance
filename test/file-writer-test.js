'use strict';

const rimraf      = require('rimraf');
const assert      = require('assert');
const FileWriter  = require('../lib/file-writer');

describe('FileWriter', () => {
  let basePath = __dirname + '/fixtures/accessibility';
  let writer = new FileWriter(basePath);

  beforeEach((done) => {
    rimraf(basePath, () => { done(); });
  });

  it('deduces the file path based on the data passed in', () => {
    let data = {
      path: 'my-great-page',
      size: 'mobile',
      results: []
    };
    assert.equal(writer.filePath(data), basePath + '/my-great-page^^mobile.json');
  });

  it('escapes slashes in the path when determining the file path', () => {
    let data = {
      path: 'about/my-great-page',
      size: 'mobile',
      results: []
    };
    assert.equal(writer.filePath(data), basePath + '/about__my-great-page^^mobile.json');
  });

  it('leaves off the size information from the file path when not in data', () => {
    let data = {
      path: 'my-great-page',
      results: []
    };
    assert.equal(writer.filePath(data), basePath + '/my-great-page.json');
  });

  it('writes data verbatim to the file, even if the directory does not exist', (done) => {
    let data = {
      path: 'about/my-great-page',
      size: 'mobile',
      results: []
    };

    writer.write(data, (err) => {
      if (err) { return done(err); }
      let savedData = require(writer.filePath(data));
      assert.deepEqual(savedData, data);
      done();
    });
  });
});
