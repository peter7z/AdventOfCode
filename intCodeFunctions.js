import { intToArray } from './helpers.js'

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

async function executeInstruction({ instruction, op1, op2, save }, mem, pointer, read, write) {
  switch (instruction) {
    case 1:
      mem[save] = op1 + op2
      return pointer + 4
    case 2:
      mem[save] = op1 * op2
      return pointer + 4
    case 3:
      mem[save] = await read()
      return pointer + 2
    case 4:
      write(op1)
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

async function runProgram(program, read, write, name) {
  const mem = [...program]
  name && console.log('Running program: ', name)

  for (let i = 0;;) {
    const instruction = parseInstruction(i, mem)
    i = await executeInstruction(instruction, mem, i, read, write, name)
    if (!i) break
  }
}

export default runProgram
