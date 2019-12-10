import { logDayResults } from './helpers.js'

import * as day1 from './Day1/code.js'
import * as day2 from './Day2/code.js'
import * as day3 from './Day3/code.js'
import * as day4 from './Day4/code.js'
import * as day5 from './Day5/code.js'
import * as day6 from './Day6/code.js'
import * as day7 from './Day7/code.js'
import * as day8 from './Day8/code.js'

console.log() // for (let i = 0; i < 9; i++) {}
;(async () => {
  await logDayResults(day1, 1)
  await logDayResults(day2, 2)
  await logDayResults(day3, 3)
  await logDayResults(day4, 4)
  await logDayResults(day5, 5)
  await logDayResults(day6, 6)
  await logDayResults(day8, 8)
})()
