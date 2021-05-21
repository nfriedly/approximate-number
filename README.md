# Approximate Number [![Build Status](https://secure.travis-ci.org/nfriedly/approximate-number.png?branch=master)](http://travis-ci.org/nfriedly/approximate-number)

Converts numbers into a more human-friendly format, similar to `ls`'s `--human-readable` flag (`ls -lh`) or Stack
Overflow's reputation numbers. For example, 123456 becomes '123k'.

Works in Node.js and in browsers.

```js
var approx = require('approximate-number');

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

```

## Getting Started

### Node.js

Install node module with: `npm install --save approximate-number`

```js
var approx = require('approximate-number');
approx(123456) // 123k
```

### Bower

Install with: `bower install approximate-number`

```html
<script src="/bower_components/approximate-number/lib/approximate-number.js"></script>
<script>
alert(approximateNumber(1234567890)); // 1.2b
</script>
```

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

## V2.1 Changes
* Added precision

## V2 Changes

* Added optional configuration object
* Changed default from rounding to truncation. Override with `options.round=true`.
* Started abbreviating numbers between 1000 and 9999 by default. Override with `options.min10k=true`.
* Added trillions support.
* Dropped cli support.

## License

Copyright (c) 2014 Nathan Friedly  
Licensed under the MIT license.


[tests]: https://github.com/nfriedly/approximate-number/blob/master/test/approximate-number_test.js
