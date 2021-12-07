module.exports = (positions) => {
  positions.sort((a, b) => a - b)
  let fuel = Number.MAX_VALUE

  const calculate = (point) => positions.reduce((sum, p) => sum + Math.abs(point - p), 0)
  for (let i = 0; i < positions.length; i++) {
    const element = positions[i]
    if (element !== positions[i - 1]) {
      const curFuel = calculate(element)
      console.log('curFuel')
      if (curFuel < fuel) { fuel = curFuel }
    }
  }
  return fuel
}
