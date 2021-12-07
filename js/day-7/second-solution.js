module.exports = (positions) => {
  positions.sort((a, b) => a - b)
  let fuel = Number.MAX_VALUE

  const calculate = (point) => positions.reduce((sum, p) => {
    const dist = Math.abs(point - p)
    const f = dist > 0 ? ((dist * (dist + 1)) / 2) : 0
    return sum + f
  }, 0)
  for (let i = positions[0]; i < positions[positions.length - 1]; i++) {
    const curFuel = calculate(i)

    if (curFuel < fuel) { fuel = curFuel }
  }
  return fuel
}
