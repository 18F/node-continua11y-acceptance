'use strict';

//const Continua11yAcceptance = require('./lib/continua11y-acceptance');

// USAGE:
//
// const continua11yAcceptance = require('continua11y-acceptance');
// const continua11yConfig     = require('./config/continua11y.json');
// 
// let testGenerator = continua11yAcceptance.config(continua11yConfig, {more: 'detailed config'});
// let test = continua11yAcceptance.test('mobile', server)
// test.run(path, (err, results) => {
//   if (err) { done(err); }
//   results.assertNoErrors();
//   results.assertWarningsLessThan(20);
// });


module.exports = function continua11yAcceptance() {
  return new Continua11yAcceptance();
};

class Continua11yAcceptance {
  constructor() {
    this.config = {};
  }

  config(json) {
    
  }

  test(server, size) {
    size = size || 'default';
    
  }
}

