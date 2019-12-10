import data from './data.js'

// Part 1
function execute(array, noun, verb) {
  const data = [...array]
  data[1] = noun
  data[2] = verb
  for (let i = 0; i < data.length; i += 4) {
    const m1 = data[i + 1]
    const m2 = data[i + 2]
    const m3 = data[i + 3]
    if (data[i] === 1) {
      data[m3] = data[m1] + data[m2]
    } else if (data[i] === 2) {
      data[m3] = data[m1] * data[m2]
    }
  }
  return data[0]
}

export const part1 = () => execute(data, 12, 2)

// Part 2
export function part2() {
  for (let i = 0; i < 550; i++) {
    for (let j = 0; j < 550; j++) {
      const result = execute(data, i, j)
      if (result == 19690720) return 100 * i + j
    }
  }
}
