import { intToArray } from './helpers.js'

function parseOperand(opMode, mem, opPosition, base) {
  switch (opMode) {
    case 0:
      return mem[mem[opPosition]]
    case 1:
      return mem[opPosition]
    case 2:
      return mem[mem[opPosition] + base]
    default:
      return mem[mem[opPosition]]
  }
}

function parseSaveMode(saveMode, mem, savePosition, base) {
  switch (saveMode) {
    case 0:
      return mem[savePosition]
    case 2:
      return mem[savePosition] + base
    default:
      return mem[savePosition]
  }
}

function parseInstruction(pointer, mem, base) {
  const [instruction1, instruction2, op1mode, op2mode, op3mode] = intToArray(
    mem[pointer],
  ).reverse()

  let instruction = instruction1

  if (instruction2) instruction += instruction2 * 10

  switch (instruction) {
    case 1:
    case 2:
    case 7:
    case 8:
      return {
        instruction,
        op1: parseOperand(op1mode, mem, pointer + 1, base),
        op2: parseOperand(op2mode, mem, pointer + 2, base),
        save: parseSaveMode(op3mode, mem, pointer + 3, base),
      }
    case 3:
      return {
        instruction,
        save: parseSaveMode(op1mode, mem, pointer + 1, base),
      }
    case 4:
      return {
        instruction,
        op1: parseOperand(op1mode, mem, pointer + 1, base),
      }
    case 5:
    case 6:
      return {
        instruction,
        op1: parseOperand(op1mode, mem, pointer + 1, base),
        op2: parseOperand(op2mode, mem, pointer + 2, base),
      }
    case 9:
      return {
        instruction,
        op1: parseOperand(op1mode, mem, pointer + 1, base),
      }
    case 99:
      return { instruction }
  }
}

async function executeInstruction(
  { instruction, op1, op2, save },
  mem,
  pointer,
  setBase,
  read,
  write,
) {
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
      setBase(op1)
      return pointer + 2
    case 99:
      return NaN
  }
}

async function runProgram(program, read, write, name) {
  const mem = [...program]
  name && console.log('Running program: ', name)
  let base = 0
  const setBase = offset => (base += offset)

  for (let i = 0; ; ) {
    const instruction = parseInstruction(i, mem, base)
    // console.log(i, instruction)
    i = await executeInstruction(
      instruction,
      mem,
      i,
      setBase,
      read,
      write,
      name,
    )
    if (!i) break
  }
}

export default runProgram
