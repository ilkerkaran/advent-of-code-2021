module.exports = (rawStr, d0 = -50, d1 = 50) => {
  const lines = rawStr.split('\n').map((l) => l.split(' '))
  const instructions = {}
  for (let index = 0; index < lines.length; index++) {
    const [sw, coorStr] = lines[index]
    const [x, y, z] = coorStr.split(',').map((co) =>
      co
        .split('=')[1]
        .split('..')
        .map((n) => +n)
    )
    const xStart = Math.max(x[0], d0)
    const xEnd = Math.min(x[1], d1)
    const yStart = Math.max(y[0], d0)
    const yEnd = Math.min(y[1], d1)
    const zStart = Math.max(z[0], d0)
    const zEnd = Math.min(z[1], d1)
    for (let i = xStart; i <= xEnd; i++) {
      for (let j = yStart; j <= yEnd; j++) {
        for (let k = zStart; k <= zEnd; k++) {
          instructions[`${i},${j},${k}`] = sw == 'on'
        }
      }
    }
    // console.log('instruction ', index + 1)
    // console.log(instructions)
  }

  const sum = Object.values(instructions).filter((i) => i).length
  return sum
}
