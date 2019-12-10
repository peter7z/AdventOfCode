const program = require('./data')
const runProgram = require('../intcodeFunctions')
const Resource = require('../SharedResource')
const { permutations, flatArray } = require('../helpers')

// Part 1

async function executeSequence(program, sequence) {
  let signal = 0
  for (int of sequence) {
    function * inputsGenerator() {
      const inputArray = [int, signal]
      for (input of inputArray) yield input
    }
    const inputs = inputsGenerator()

    await runProgram(
      program,
      () => inputs.next().value,
      sig => signal = sig,
    )
  }
  return signal
}

async function findMaxSignal(program) {
  let maxSignal = 0
  let maxSequence
  for (sequence of permutations([0,1,2,3,4])) {
    const signal = await executeSequence(program, sequence)
    if (signal > maxSignal) {
      maxSequence = sequence
      maxSignal = signal
    }
  }
  return [maxSignal, maxSequence]
}

(async () => {
  const [maxSignal] = await findMaxSignal(program)
  console.log('Part 1:', maxSignal)
})()

//Part 2

async function findMaxSignalLoop(program) {
  let maxSignal = 0
  let maxSequence
  for (sequence of permutations([5,6,7,8,9])) {
    const resources = (await executeSequenceLoop(program, sequence)).map(({ data }) => data)
    const signal = flatArray(resources).find(x => x)
    if (signal > maxSignal) {
      maxSequence = sequence
      maxSignal = signal
    }
  }
  
  return [maxSignal, maxSequence]
}

async function executeSequenceLoop(program, sequence) {
  const resources = sequence.map((int, index) => {
    const resource = new Resource(`Buffer ${index}`)
    resource.write(int)
    if (index === 0) resource.write(0)
    return resource
  })

  const threads = sequence.map((int, index) => {
    let next = (index + 1) % 5
    return runProgram(
      program,
      resources[index].read,
      resources[next].write,
    )
  })

  await Promise.all(threads)
  return resources
}


;(async () => {
  const [maxSignal] = await findMaxSignalLoop(program)
  console.log('Part 2:', maxSignal)
})()
