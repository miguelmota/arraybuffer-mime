const arrayBufferConcat = require('arraybuffer-concat')

function arrayBufferWithMime(arrayBuffer, mime) {
  const len = mime.length
  const uint8 = new Uint8Array(len + 1)

  uint8[0] = len

  for (var i = 0; i < len; i++) {
    var n = mime[i].charCodeAt(0)
    uint8[i+1] = n
  }

  const ab = arrayBufferConcat(uint8, arrayBuffer)

  return ab
}

function arrayBufferMimeDecouple(arrayBufferWithMime) {
  const uint8 = new Uint8Array(arrayBufferWithMime)
  var mime = ''
  const len = uint8[0]

  for (var i = 0; i < len; i++) {
    var char = uint8[i+1]

    mime += String.fromCharCode(char)
  }

  var arrayBuffer = uint8.slice(len+1).buffer

  return {
    mime: mime,
    arrayBuffer: arrayBuffer
  }
}

module.exports = {
  arrayBufferWithMime: arrayBufferWithMime,
  arrayBufferMimeDecouple: arrayBufferMimeDecouple
}
