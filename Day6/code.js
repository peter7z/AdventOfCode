import orbitMap from './data.js'

const nodeList = {}
const nodeMarks = {}

function Astro(name, orbiters = [], orbitee = null) {
  this.name = name
  this.orbiters = orbiters
  this.orbitee = orbitee
  nodeList[name] = this
}

function totalOrbits({ orbiters }, current = 0) {
  if (!orbiters.length) return current
  return (
    orbiters.reduce((acc, node) => acc + totalOrbits(node, current + 1), 0) +
    current
  )
}

function findDistanceToNode(from, to, currentDistance = 0) {
  if (nodeMarks[from.name]) return Infinity
  else nodeMarks[from.name] = true

  if (from.name === to.name) return currentDistance

  let orbitersDistances = [Infinity]
  if (from.orbiters.length) {
    orbitersDistances = from.orbiters.map(astro =>
      findDistanceToNode(astro, to, currentDistance + 1),
    )
  }

  let orbiteeDistance = Infinity
  if (from.orbitee) {
    orbiteeDistance = findDistanceToNode(from.orbitee, to, currentDistance + 1)
  }

  return Math.min(orbiteeDistance, ...orbitersDistances)
}

for (const [orbitee, orbiter] of orbitMap) {
  let orbiterNode = nodeList[orbiter]
  let orbiteeNode = nodeList[orbitee]

  if (!orbiterNode && !orbiteeNode) {
    orbiterNode = new Astro(orbiter)
    orbiteeNode = new Astro(orbitee, [orbiterNode])
    orbiterNode.orbitee = orbiteeNode
  } else if (!orbiteeNode) {
    orbiteeNode = new Astro(orbitee, [orbiterNode])
    orbiterNode.orbitee = orbiteeNode
  } else if (!orbiterNode) {
    orbiterNode = new Astro(orbiter, [], orbiteeNode)
    orbiteeNode.orbiters.push(orbiterNode)
  } else {
    orbiterNode.orbitee = orbiteeNode
    orbiteeNode.orbiters.push(orbiterNode)
  }
}

// Part 1
export const part1 = () => totalOrbits(nodeList.COM)

// Part 2
export const part2 = () =>
  findDistanceToNode(nodeList.YOU.orbitee, nodeList.SAN.orbitee)
