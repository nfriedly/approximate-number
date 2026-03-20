# Approximate Number

[![CI](https://github.com/nfriedly/approximate-number/actions/workflows/ci.yml/badge.svg)](https://github.com/nfriedly/approximate-number/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/approximate-number.svg)](https://www.npmjs.com/package/approximate-number)
[![npm downloads](https://img.shields.io/npm/dm/approximate-number)](https://www.npmjs.com/package/approximate-number)

Abbreviates numbers into a more human-friendly format, similar to `ls`'s `--human-readable` flag (`ls -lh`) or Stack
Overflow's reputation numbers. For example, 123456 becomes '123k'.

Works in Node.js and in browsers.

```js
import { approximateNumber as approx } from 'approximate-number';
// to require() rather than import, use version 2.x

console.log(approx(1234));
//> 1.2k

console.log(approx(12345));
//> 12k

console.log(approx(1234, {decimal: false}));
//> 1k

console.log(approx(1234, {decimal: ','}));
//> 1,2k

console.log('My Stack Overflow reputation is %s.', approx(3671, {
  min10k: true
}));
//> My Stack Overflow reputation is 3,671.

console.log('The US national debt is %s.', approx(19939034457936, {
  prefix: '$', 
  capital: true, 
  round: true
}));
// > The US national debt is $20T.

// Truncates/floors numbers by default
approx(9999);
// > '9.9k'

// Set `round: true` to round instead of floor.
approx(9999,{round: true});
// > '10k'

```

## Getting Started

### Node.js

Install node module with: `npm install --save approximate-number`

```js
import approximateNumber from 'approximate-number';
approximateNumber(123456); // 123k
```

For CommonJS projects, use version 2.x: run `npm install --save approximate-number@2` to install and then do `const approximateNumber = require("approximate-number");` to load the module.

### Browser usage without a package manager

Grab the latest [approximate-number.js](https://github.com/nfriedly/approximate-number/blob/master/lib/approximate-number.js) and copy it onto your site.

## Options

* **separator** {String|Boolean} Default = `','`. Thousands separator - set to a string (e.g. '.') to use that string or false to not use any separator.
* **decimal** {String|Boolean} Default = `'.'`. Decimal - set to a string (e.g. ',') to use that or set to false to avoid outputting values with a decimal.
* **round** {Boolean} Default = `false`. Round numbers off rather than flooring/truncating. When true, 105000 would become '11m', when false it becomes '10m'.
* **min10k** {Boolean} Default = `false`. Do not abbreviate numbers below 10000. E.g. 9999 would become '9,999' rather than '9k'. (Stack Overflow-style).
* **prefix** {String} Default = `''`. Optional string to prepend to the value, e.g. '$'.
* **suffix** {String} Default = `''`. Optional string to append to the value, e.g. '%'.
* **capital** {Boolean} Default = `false`. Set to true to use capital letters, e.g. 3.9M instead of 3.9m
* **precision** {Number} Default = undefined. Number of significant digits. Must be greater than 0. Use of this option forces rounding.

## V3 Changes
* Converted library from CommonJS to ESM

## V2.1 Changes
* Added precision

## V2 Changes

* Added optional configuration object
* Changed default from rounding to truncation. Override with `options.round=true`.
* Started abbreviating numbers between 1000 and 9999 by default. Override with `options.min10k=true`.
* Added trillions support.
* Dropped cli support.

## License

Copyright (c) 2014-2026 Nathan Friedly  
Licensed under the MIT license.


[tests]: https://github.com/nfriedly/approximate-number/blob/master/test/approximate-number_test.js
