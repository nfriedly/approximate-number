/* Approximate Number - outputs numbers in human-readable format, similar to ls -lh or Stack Overflow's reputation
 *
 * https://github.com/nfriedly/approximate-number
 *
 * Copyright (c) 2014 Nathan Friedly
 * Licensed under the MIT license.
 */

const THOUSAND = 1000;
const TEN_THOUSAND = 10000;
const MILLION = 1000000;
const BILLION = 1000000000;
const TRILLION = 1000000000000;

const addCommas = (num, opts) => {
  if (opts.separator === false) {
    return num.toString();
  }

  if (num < 1000) {
    return num.toString();
  }

  const separator = typeof opts.separator === 'string' ? opts.separator : ',';

  const out = [];
  const digits = Math.round(num).toString().split('');

  digits.reverse().forEach((digit, i) => {
    if (i && i % 3 === 0) {
      out.push(separator);
    }
    out.push(digit);
  });

  return out.reverse().join('');
};

const formatDec = (num, base, opts) => {
  const workingNum = num / base;
  const ROUND = opts.round ? 'round' : 'floor';

  if (opts.decimal === false) {
    const value = Math[ROUND](workingNum);
    return value.toString();
  }

  let value;
  if (opts.precision) {
    value = workingNum;
  } else {
    value = workingNum < 10 ? Math[ROUND](workingNum * 10) / 10 : Math[ROUND](workingNum);
  }

  let str = value.toString();
  if (typeof opts.decimal === 'string') {
    str = str.replace('.', opts.decimal);
  }

  return str;
};

/**
 * Converts big numbers into human-readable forms
 * @param {Number} num
 * @param {Object} [opts]
 * @param {String|Boolean} [opts.separator=',']  Thousands separator - set to a string (e.g. '.') to use that string or false to not use any separator
 * @param {String|Boolean} [opts.decimal='.'] Decimal - set to a string (e.g. ',') to use that or set to false to avoid outputting values with a decimal
 * @param {Boolean} [opts.round=false] Round numbers off rather than flooring/truncating. When true, 105000 would become '11m', when false it becomes '10m'
 * @param {Boolean} [opts.min10k=false] Do not abbreviate numbers below 10000. E.g. 9999 would become '9,999' rather than '9k'. (Stack Overflow-style)
 * @param {String} [opts.prefix=''] Optional string to prepend to the value, e.g. '$'
 * @param {String} [opts.suffix=''] Optional string to append to the value, e.g. '%'
 * @param {Boolean} [opts.capital=false] Set to true to use capital letters, e.g. 3.9M instead of 3.9m
 * @param {Number} [opts.precision] Optional number of significant digits. Must be greater than 0.
 *
 * @returns {String}
 */
function approximateNumber(num, opts = {}) {
  let numString;

  const negative = num < 0;
  if (negative) {
    num = Math.abs(num);
  }

  if (opts.precision) {
    num = parseFloat(num.toPrecision(opts.precision));
  }

  const thousandsBreak = opts.min10k ? TEN_THOUSAND : THOUSAND;

  if (num < thousandsBreak) {
    numString = addCommas(formatDec(num, 1, opts), opts);
  } else if (opts.precision && opts.precision > Math.log10(num)) {
    numString = addCommas(formatDec(num, 1, opts), opts);
  } else if (num < MILLION) {
    numString = `${formatDec(num, THOUSAND, opts)}k`;
  } else if (num < BILLION) {
    numString = `${formatDec(num, MILLION, opts)}m`;
  } else if (num < TRILLION) {
    numString = `${addCommas(formatDec(num, BILLION, opts), opts)}b`;
  } else {
    numString = `${addCommas(formatDec(num, TRILLION, opts), opts)}t`;
  }

  if (negative) {
    numString = `-${numString}`;
  }

  if (opts.capital) {
    numString = numString.toUpperCase();
  }

  if (opts.prefix) {
    numString = `${opts.prefix}${numString}`;
  }

  if (opts.suffix) {
    numString = `${numString}${opts.suffix}`;
  }

  return numString;
}

approximateNumber.addCommas = addCommas;

export default approximateNumber;
export { approximateNumber, addCommas };

