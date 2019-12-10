import data from './data.js'

function calculateFuel(fuel) {
  let res = Math.floor(fuel / 3)
  return res - 2
}

function recursiveFuel(fuel) {
  const requiredFuel = calculateFuel(fuel)
  if (requiredFuel <= 0) return 0
  else return requiredFuel + recursiveFuel(requiredFuel)
}

export const part1 = () =>
  data.reduce((totalMass, mass) => totalMass + calculateFuel(mass), 0)

export const part2 = () =>
  data.reduce((totalMass, mass) => totalMass + recursiveFuel(mass), 0)
