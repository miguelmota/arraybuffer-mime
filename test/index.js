var test = require('tape');
var {
  arrayBufferWithMime,
  arrayBufferMimeDecouple
} = require('../');

test('arraybuffer with mime', function (t) {
  'use strict';

  t.plan(6);

  var ab = new Uint8Array(4)
  ab[0] = 10
  ab[1] = 20
  ab[2] = 30
  ab[3] = 40

  var abm = arrayBufferWithMime(ab.buffer, 'image/png')
  var abo = arrayBufferMimeDecouple(abm)

  t.equal(abo.mime, 'image/png');
  t.deepEqual(abo.arrayBuffer, ab.buffer);

  var ab2 = new Uint8Array(2)
  ab2[0] = 5
  ab2[1] = 7

  var abm2 = arrayBufferWithMime(ab2.buffer, 'audio/mpeg')
  var abo2 = arrayBufferMimeDecouple(abm2)

  t.equal(abo2.mime, 'audio/mpeg');
  t.deepEqual(abo2.arrayBuffer, ab2.buffer);

  var ab3 = new Uint8Array(1)
  ab3[0] = 1

  var abm3 = arrayBufferWithMime(ab3.buffer, 'idontexist')
  var abo3 = arrayBufferMimeDecouple(abm3)

  t.equal(abo3.mime, '');
  t.deepEqual(abo3.arrayBuffer, ab3.buffer);
  console.log(abo3.arrayBuffer)
});
