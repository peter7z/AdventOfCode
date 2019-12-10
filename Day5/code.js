const runProgram = require('../intcodeFunctions.js')
const program = require('./data')

// Part 1
runProgram(program, () => 1, console.log)

// Part 2
runProgram(program, () => 5, console.log)
