module.exports = (rawStr) => {
  const input = rawStr.split('\n')
  const final = Array(14)
  const stack = []

  for (let i = 0; i < 14; i += 1) {
    const xAdd = parseInt(input[18 * i + 5].split(' ')[2])
    const yAdd = parseInt(input[18 * i + 15].split(' ')[2])
    let toAdd = 1
    if (xAdd > 0) {
      stack.push([yAdd, i])
    } else {
      const s = stack.pop()
      const [y, yIndex] = [s[0], s[1]]
      while (toAdd + y + xAdd < 1) toAdd++
      final[i] = toAdd + y + xAdd
      final[yIndex] = toAdd
    }
  }

  return final.join('')
}
