import { wire1, wire2 } from './data.js'

export function part1() {
  const grid = new Set()
  let minDistance = Infinity
  let x = 0,
    y = 0

  function checkAndSetDistance(x, y) {
    if (grid.has(`${x},${y}`)) {
      const distance = Math.abs(x) + Math.abs(y)
      minDistance > distance && (minDistance = distance)
    }
  }

  // Wire 1

  for (const movement of wire1) {
    const direction = movement.substring(0, 1)
    const distance = parseInt(movement.substring(1))

    switch (direction) {
      case 'U':
        for (let i = 0; i < distance; i++) y++, grid.add(`${x},${y}`)
        break
      case 'D':
        for (let i = 0; i < distance; i++) y--, grid.add(`${x},${y}`)
        break
      case 'R':
        for (let i = 0; i < distance; i++) x++, grid.add(`${x},${y}`)
        break
      case 'L':
        for (let i = 0; i < distance; i++) x--, grid.add(`${x},${y}`)
        break
    }
  }

  // Wire 2

  x = 0
  y = 0

  for (const movement of wire2) {
    const direction = movement.substring(0, 1)
    const distance = parseInt(movement.substring(1))
    switch (direction) {
      case 'U':
        for (let i = 0; i < distance; i++) y++, checkAndSetDistance(x, y)
        break
      case 'D':
        for (let i = 0; i < distance; i++) y--, checkAndSetDistance(x, y)
        break
      case 'R':
        for (let i = 0; i < distance; i++) x++, checkAndSetDistance(x, y)
        break
      case 'L':
        for (let i = 0; i < distance; i++) x--, checkAndSetDistance(x, y)
        break
    }
  }

  return minDistance
}
