module.exports = (rawStr) => {
  const lines = rawStr
    .split('\n')
    .filter((l) => l)
    .map((l) => l.split(' '))
  let mem = { w: 0, x: 0, y: 0, z: 0 }

  const op = (operator, a, b) => {
    switch (operator) {
      case 'add':
        return a + b
      case 'mul':
        return a * b
      case 'div':
        return Math.floor(a / b)
      case 'mod':
        return a % b
      case 'eql':
        return a == b ? 1 : 0
      default:
        return a
    }
  }
  const resetMem = () => {
    mem = { w: 0, x: 0, y: 0, z: 0 }
  }
  let z = 0
  const validate = (model) => {
    let modelIndex = 0
    resetMem()
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i]
      if (!l) continue
      const [operator, first, second, ignore] = lines[i]
      if (ignore) continue
      if (operator == 'inp') {
        mem[first] = model[modelIndex]
        modelIndex++

        console.log('reading mem', mem)
      } else {
        const firstVal = +mem[first]
        const secondVal = Number.isNaN(+second) ? +mem[second] : +second
        const opRes = op(operator, firstVal, secondVal)
        mem[first] = opRes
        // console.log('operation', operator, first, second, '=', opRes)
      }
    }
    return !mem.z
  }

  const p = (i, read, add, other) => {
    const x = z
    if (add < 0) z = Math.floor(z / 26)
    const kalan = (x % 26) + add
    if (read != kalan) {
      z *= 26
      z += read + other
    }

    console.log(i + 1, '\t', 'z', read, kalan, '\t', add, '\t', other, '\t', z)
  }

  const reverseP = (res, add, other) => {
    if (read != (x % 26) + add) {
      z *= 26
      z += read + other
    }
  }
  const validate1 = (model) => {
    z = 0
    p(0, model[0], 11, 8)
    // console.log('z', z)
    p(1, model[1], 12, 8)
    // console.log('z', z)
    p(2, model[2], 10, 12)
    // console.log('z', z)
    p(3, model[3], -8, 10)
    // console.log('z', z)
    p(4, model[4], 15, 2)
    // console.log('z', z)
    p(5, model[5], 15, 8)
    // console.log('z', z)
    p(6, model[6], -11, 4)
    // console.log('z', z)
    p(7, model[7], 10, 9)
    // console.log('z', z)
    p(8, model[8], -3, 10)
    // console.log('z', z)
    p(9, model[9], 15, 3)
    // console.log('z', z)
    p(10, model[10], -3, 7)
    if (z >= 26 * 26 * 26) return false
    // console.log('z', z)
    p(11, model[11], -1, 7)
    if (z >= 26 * 26) return false
    // console.log('z', z)
    p(12, model[12], -10, 2)
    if (z >= 26) return false
    // console.log('z', z)
    p(13, model[13], -16, 2)
    // console.log('z', z)
    return z == 0
  }
  let modelNum = 0
  for (let i = 99598999999999; i > 99598111111111; i--) {
    const arr = `${i}`.split('').map((i) => +i)
    if (arr.some((c) => !c)) continue
    const isValid = validate1(arr)
    if (isValid) {
      modelNum = i
      break
    }
  }
  // 99598852899971
  // validate([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4])
  const arr = [9, 9, 5, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
  // validate1(arr)
  return modelNum
}
