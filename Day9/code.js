import program from './data.js'
import runProgram from '../intCodeFunctions.js'

export const part1 = async () => {
  let res
  await runProgram(
    program,
    () => 1,
    r => (res = r),
  )
  return res
}

export const part2 = async () => {
  let res
  await runProgram(
    program,
    () => 2,
    r => (res = r),
  )
  return res
}
