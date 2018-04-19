(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const arrayBufferConcat = require('arraybuffer-concat')

const ARRAY_SIZE = 100

function arrayBufferWithMime(arrayBuffer, mime) {
  const uint8 = new Uint8Array(ARRAY_SIZE)
  const len = mime.length

  for (var i = 0; i < len; i++) {
    var n = mime[i].charCodeAt(0)
    uint8[i] = n
  }

  const ab = arrayBufferConcat(uint8, arrayBuffer)

  return ab
}

function arrayBufferMimeDecouple(arrayBufferWithMime) {
  const uint8 = new Uint8Array(arrayBufferWithMime)
  var mime = ''

  for (var i = 0; i < ARRAY_SIZE; i++) {
    var char = uint8[i]
    if (char === 0) {
      break
    }

    mime += String.fromCharCode(char)
  }

  var arrayBuffer = uint8.slice(ARRAY_SIZE).buffer

  return {
    mime,
    arrayBuffer
  }
}

module.exports = {
  arrayBufferWithMime,
  arrayBufferMimeDecouple
}

},{"arraybuffer-concat":2}],2:[function(require,module,exports){
(function(root) {
  'use strict'

  function isValidArray(x) {
    return /Int8Array|Int16Array|Int32Array|Uint8Array|Uint8ClampedArray|Uint16Array|Uint32Array|Float32Array|Float64Array|ArrayBuffer/gi.test(Object.prototype.toString.call(x))
  }

  function arrayBufferConcat(/* arraybuffers */) {
    var arrays = [].slice.call(arguments)

    if (arrays.length <= 0 || !isValidArray(arrays[0])) {
      return new Uint8Array(0).buffer
    }

    var arrayBuffer = arrays.reduce(function(cbuf, buf, i) {
      if (i === 0) return cbuf
      if (!isValidArray(buf)) return cbuf

      var tmp = new Uint8Array(cbuf.byteLength + buf.byteLength)
      tmp.set(new Uint8Array(cbuf), 0)
      tmp.set(new Uint8Array(buf), cbuf.byteLength)

      return tmp.buffer
    }, arrays[0])

    return arrayBuffer
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = arrayBufferConcat
    }
    exports.arrayBufferConcat = arrayBufferConcat
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return arrayBufferConcat
    })
  } else {
    root.arrayBufferConcat = arrayBufferConcat
  }
})(this)

},{}]},{},[1]);
