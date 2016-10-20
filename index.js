'use strict';

const Continua11yAcceptance = require('./lib/continua11y-acceptance');

module.exports = function continua11yAcceptance(config) {
  return new Continua11yAcceptance(config);
};
