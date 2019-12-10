import runProgram from '../intcodeFunctions.js'
import program from './data.js'

export async function part1() {
  let r1
  await runProgram(
    program,
    () => 1,
    r => (r1 = r),
  )
  return r1
}

export async function part2() {
  let r2
  await runProgram(
    program,
    () => 5,
    r => (r2 = r),
  )
  return r2
}
