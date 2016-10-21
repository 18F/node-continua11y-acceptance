'use strict';

const fs = require('fs');

class FileWriter {
  constructor(path) {
    this.path = path;
  }

  write(data, callback) {
    this.ensurePathExists((err) => {
      if (err) { return callback(err); }
      this.writeFile(data, callback);
    });
  }

  ensurePathExists(callback) {
    fs.exists(this.path, (exists) => {
      if (exists) { return callback(); }
      fs.mkdir(this.path, (err) => { callback(err); });
    });
  }

  writeFile(data, callback) {
    let path = this.filePath(data);
    fs.writeFile(path, JSON.stringify(data), {flag: 'w'}, callback);
  }

  filePath(data) {
    let dataPath = data.path.replace(/^\//, '').replace('/', '__');
    let sizeInfo = data.size ? '^^' + data.size : '';
    return this.path + '/' + dataPath +  sizeInfo + '.json';
  }
}

module.exports = FileWriter;
