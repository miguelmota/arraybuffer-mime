# arraybuffer-mime

> Prepends fixed length byte array to indicate mime type of the ArrayBuffer.

# Install

```bash
npm install arraybuffer-mime
```

# Usage

Basic example:

```javascript
const {
  arrayBufferWithMime,
  arrayBufferMimeDecouple
} = require('arraybuffer-mime')

// "some image"
const uint8 = new Uint8Array(1)
uint8[0] = 1
const ab = uint8.buffer

const mime = 'image/png'
const abWithMime = arrayBufferWithMime(ab, mime)

const {mime, arrayBuffer} = arrayBufferMimeDecouple(abWithMime)

console.log(mime) // "image/png"
console.log(arrayBuffer) // ArrayBuffer
```

Example demonstrating sending a binary file over Websockets:

```javascript
const {
  arrayBufferWithMime,
  arrayBufferMimeDecouple
} = require('arraybuffer-mime')

const ws = new WebSocket(`ws://localhost:8080/`)
ws.binaryType = 'arraybuffer'

const fileInput = document.querySelector('input[type="file"]')
const file = fileInput.files[0]
const reader = new FileReader()

const readFile = (event) => {
  const arrayBuffer = reader.result
  const mime = file.type

  const abWithMime = arrayBufferWithMime(arrayBuffer, mime)
  ws.send(abWithMime)
}

reader.addEventListener('load', readFile)
reader.readAsArrayBuffer(file)

ws.on('message', (event) => {
  const abWithMime = event.data
  const {mime, arrayBuffer} = arrayBufferMimeDecouple(abWithMime)

  const blob = new Blob([arrayBuffer], {type: mime})
  const url = window.URL.createObjectURL(blob)

  console.log(url)
})
```

# Test

```bash
npm test
```

# License

MIT
