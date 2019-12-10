import raw from './data.js'

function getLayers(data, x, y) {
  const layers = []
  for (let i = 0; i < data.length; i += x * y) {
    layers.push(data.slice(i, i + x * y))
  }
  return layers
}

const layers = getLayers(raw, 25, 6)

const getNumberOfOccurrences = digit => layer =>
  [...layer].reduce(
    (digits, current) => (digits += current === digit ? 1 : 0),
    0,
  )

const getFewestZerosLayer = layers =>
  layers.reduce(
    (lowestZeroPair, layer, index) => {
      const zerosInLayer = getNumberOfOccurrences('0')(layer)
      return zerosInLayer < lowestZeroPair[0]
        ? [zerosInLayer, index]
        : lowestZeroPair
    },
    [Infinity, NaN],
  )

export function part1() {
  const [, index] = getFewestZerosLayer(layers)
  const ones = getNumberOfOccurrences('1')(layers[index])
  const twos = getNumberOfOccurrences('2')(layers[index])
  return ones * twos
}

function renderPixel(pixelLayer) {
  for (const pixel of pixelLayer) {
    if (pixel === '1' || pixel === '0') return pixel
  }
}

function renderImage() {
  const outPutLayer = []
  for (const index in layers[0]) {
    const singlePixelLayer = []
    for (const layer of layers) {
      singlePixelLayer.push(layer[index])
    }
    outPutLayer[index] = renderPixel(singlePixelLayer)
  }
  return outPutLayer.join('')
}

export function part2() {
  const raw = renderImage()
  const stars = []

  for (const char of raw)
    if (char === '1') stars.push('*')
    else stars.push(' ')

  let ready = '\n'
  for (let i = 0; i < stars.length; i += 25)
    ready += stars.join('').slice(i, i + 25) + '\n'

  return ready
}
