#! /usr/bin/env node

'use strict';

var approximateNumber = require('./approximate-number');

var userArgs = process.argv;

if (userArgs.indexOf('-h') !== -1 || userArgs.indexOf('--help') !== -1 || searchParam === undefined) {
    return console.log('usage: approximate-number 123456');
}

if (userArgs.indexOf('-v') !== -1 || userArgs.indexOf('--version') !== -1) {
    return console.log(require('./../package').version);
}

console.log(approximateNumber(userArgs[1]));