const arrayBufferConcat = require('arraybuffer-concat')

const ARRAY_SIZE = 100

function arrayBufferWithMime(arrayBuffer, mime) {
  const uint8 = new Uint8Array(ARRAY_SIZE)
  const len = mime.length

  for (let i = 0; i < len; i++) {
    var n = mime[i].charCodeAt(0)
    uint8[i] = n
  }

  const ab = arrayBufferConcat(uint8, arrayBuffer)

  return ab
}

function arrayBufferMimeDecouple(arrayBufferWithMime) {
  const uint8 = new Uint8Array(arrayBufferWithMime)
  let mime = ''

  for (let i = 0; i < ARRAY_SIZE; i++) {
    let char = uint8[i]
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
