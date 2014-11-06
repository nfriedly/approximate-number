/*global describe,it*/
'use strict';
var assert = require('assert'),
    format = require('util').format,
  approximateNumber = require('../lib/approximate-number.js');

describe('approximate-number node module.', function() {
  // input => output
  var tests = {
    0: '0',
    0.1: '0.1',
    1: '1',
    10: '10',
    999: '999',
    1000: '1,000',
    1001: '1,001',
    1234: '1,234',
    9999: '9,999',
    10000: '10k',
    10000.1: '10k',
    10500: '11k',
    10999: '11k',
    11111: '11k',
    111111: '111k',
    1000000: '1m',
    1111111: '1.1m',
    12345678: '12m',
    1000000000: '1b',
    1500000000: '1.5b',
    9500000000: '9.5b',
    10000000000: '10b',
    10500000000: '11b',
    1000000000000: '1,000b',
    10000000000000: '10,000b',
    9007199254740992: '9,007,199b' // javascript's maximum integer, 2^53
  };

  // positive number tests
  Object.keys(tests).forEach(function(input) {
    var expected = tests[input];

    it(format("should convert %s to %s", input, expected), function() {
      assert.equal( approximateNumber(input), expected);
    });
  });

  // negative number tests - skip 0
  Object.keys(tests).slice(1).forEach(function(input) {
    var expected = '-' +tests[input];
    input = -input;
    it(format("should convert %s to %s", input, expected), function () {
      assert.equal(approximateNumber(input), expected);
    });
  });
});
