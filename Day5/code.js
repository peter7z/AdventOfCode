
const readline = require('readline')

const { data } = require('./data')

let input

function intToArray(int) {
  return int.toString().split('').map(char => parseInt(char))
}

function parseInstruction(pointer, mem) {
  const intArray = intToArray(mem[pointer])
  intArray.reverse()
  const instruction = intArray[0]
  switch (instruction) {
    case 1:
    case 2:
    case 7:
    case 8:
      return {
        instruction,
        op1: intArray[2] ? mem[pointer + 1] : mem[mem[pointer + 1]],
        op2: intArray[3] ? mem[pointer + 2] : mem[mem[pointer + 2]],
        save: mem[pointer + 3],
      }
    case 3:
      return {
        instruction,
        save: mem[pointer + 1],
      }
    case 4:
      return {
        instruction,
        op1: intArray[2] ? mem[pointer + 1] : mem[mem[pointer + 1]],
      }
    case 5:
    case 6:
      return {
        instruction,
        op1: intArray[2] ? mem[pointer + 1] : mem[mem[pointer + 1]],
        op2: intArray[3] ? mem[pointer + 2] : mem[mem[pointer + 2]],
      }
    case 9:
      return {
        instruction
      }
  }
}

function executeInstruction({ instruction, op1, op2, save }, mem, pointer) {
  switch (instruction) {
    case 1:
      mem[save] = op1 + op2
      return pointer + 4
    case 2:
      mem[save] = op1 * op2
      return pointer + 4
    case 3:
      mem[save] = input
      return pointer + 2
    case 4:
      console.log(op1)
      return pointer + 2
    case 5:
      return op1 ? op2 : pointer + 3
    case 6:
      return op1 ? pointer + 3 : op2
    case 7:
      mem[save] = op1 < op2 ? 1 : 0
      return pointer + 4
    case 8:
      mem[save] = op1 == op2 ? 1 : 0
      return pointer + 4
    case 9:
      return NaN
  }
}

// Part 1
input = 1
let mem = [...data]
for (let i = 0;;) {
  const instruction = parseInstruction(i, mem)
  i = executeInstruction(instruction, mem, i)
  if (!i) break
}

// Part 2
input = 5
mem = [...data]
for (let i = 0;;) {
  const instruction = parseInstruction(i, mem)
  i = executeInstruction(instruction, mem, i)
  if (!i) break
}
