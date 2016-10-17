'use strict';

module.exports = function urlFor(server, path) {
  let port = server.address().port;
  let host = server.address().address;
  if (host === '::') {
    host = 'localhost';
  }

  return 'http://' + host + ':' + port + path;
};

