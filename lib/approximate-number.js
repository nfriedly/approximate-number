/*jshint node:true, browser:true*/
/*globals define*/

/* Approximate number - outputs numbers in human-readible format, similar to ls-lh or SO's reputation
 * 
 * https://github.com/nfriedly/approximate-number
 *
 * Copyright (c) 2014 Nathan Friedly
 * Licensed under the MIT license.
 */
(function() {
  'use strict';

  function addCommas(num) {
    if (num < 1000) {
      return num.toString();
    }

    var out = [],
        digits = Math.round(num).toString().split('');

    digits.reverse().forEach(function(digit, i){
      if (i && i%3 === 0) {
        out.push(',');
      }
      out.push(digit);
    });

    return out.reverse().join('');
  }

  function formatDec(num, base) {
    var workingNum = num/base;
    return workingNum < 10 ? (Math.round(workingNum * 10) / 10) : Math.round(workingNum);
  }

  function approximate(num) {
    var numString;

    // if we're working on a negative number, convert it to positive and then prefix the final result with a -
    var negative = num < 0;
    if (negative) {
      num = Math.abs(num);
    }

    if (num < 10000) {
      // <1k: #,###; < 10k: #,###
      numString = addCommas(num);
    } else if (num < 1000000) {
      // < 100k: ##.#k; < 1m: ###k
      numString =  formatDec(num, 1000) + "k";
    } else if (num < 1000000000) {
      // < 100m: ##.#m; < 1b: ###m
      numString =  formatDec(num, 1000000) + "m";
    } else {
      // < 100b: ##.#b; >= 100b: #,###b
      numString =  addCommas(formatDec(num,  1000000000)) + "b";
    }

    if (negative) {
      numString = '-' + numString;
    }

    return numString;
  }

  approximate.addCommas = addCommas;

  if (typeof module === 'object') {
    // node.js/common js
    module.exports = approximate;
  } else if (typeof define === 'function') {
    // require.js/amd
    define([], approximate);
  } else if(typeof window !== "undefined") {
    window.approximateNumber = approximate;
  }
}());
