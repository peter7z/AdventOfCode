import { wire1, wire2 } from './data.js'

export function part2() {
  const grid = new Map()
  let minCombinedSteps = Infinity
  let x = 0,
    y = 0,
    steps1 = 0,
    steps2 = 0

  for (const movement of wire1) {
    const direction = movement.substring(0, 1)
    const distance = parseInt(movement.substring(1))

    switch (direction) {
      case 'U':
        for (let i = 0; i < distance; i++)
          steps1++, y++, grid.set(`${x},${y}`, steps1)
        break
      case 'D':
        for (let i = 0; i < distance; i++)
          steps1++, y--, grid.set(`${x},${y}`, steps1)
        break
      case 'R':
        for (let i = 0; i < distance; i++)
          steps1++, x++, grid.set(`${x},${y}`, steps1)
        break
      case 'L':
        for (let i = 0; i < distance; i++)
          steps1++, x--, grid.set(`${x},${y}`, steps1)
        break
    }
  }

  function checkSteps(x, y) {
    if (grid.has(`${x},${y}`)) {
      const wire1Steps = grid.get(`${x},${y}`)
      const combinedSteps = steps2 + wire1Steps
      minCombinedSteps > combinedSteps && (minCombinedSteps = combinedSteps)
    }
  }

  x = 0
  y = 0

  for (const movement of wire2) {
    const direction = movement.substring(0, 1)
    const distance = parseInt(movement.substring(1))
    switch (direction) {
      case 'U':
        for (let i = 0; i < distance; i++) steps2++, y++, checkSteps(x, y)
        break
      case 'D':
        for (let i = 0; i < distance; i++) steps2++, y--, checkSteps(x, y)
        break
      case 'R':
        for (let i = 0; i < distance; i++) steps2++, x++, checkSteps(x, y)
        break
      case 'L':
        for (let i = 0; i < distance; i++) steps2++, x--, checkSteps(x, y)
        break
    }
  }

  return minCombinedSteps
}
