const { data } = require('./data');

function calculateFuel(fuel) {
  let res = Math.floor(fuel / 3)
  return res - 2
}

function recursiveFuel(fuel) {
  const requiredFuel = calculateFuel(fuel);
  if (requiredFuel <= 0) return 0
  else return requiredFuel + recursiveFuel(requiredFuel)
}

const totalMass = data.reduce((totalMass, mass) => totalMass + calculateFuel(mass), 0)

const totalMassRecursive = data.reduce((totalMass, mass) => totalMass + recursiveFuel(mass), 0)

console.log('Part 1 result: ', totalMass)
console.log('Part 2 result: ', totalMassRecursive)

