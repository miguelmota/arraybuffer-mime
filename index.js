const arrayBufferConcat = require('arraybuffer-concat')
const mimes = require('./lib/mimes')

function arrayBufferWithMime(arrayBuffer, mime) {
  let index = mimes.indexOf(mime)
  const uint8 = new Uint8Array(4);
  let i = 0

  while (index > -1 && i <= 4) {
    uint8[i] = index > 256 ? 255 : index

    index -= 255
    i++
  }

  const ab = arrayBufferConcat(uint8, arrayBuffer)

  return ab
}

function arrayBufferMimeDecouple(arrayBufferWithMime) {
  var uint8 = new Uint8Array(arrayBufferWithMime)
  var index = uint8[0] + uint8[1] + uint8[2] + uint8[3]

  var arrayBuffer = uint8.slice(4).buffer

  return {
    mime: mimes[index] || '',
    arrayBuffer: arrayBuffer
  }
}

module.exports = {
  arrayBufferWithMime,
  arrayBufferMimeDecouple
}
