const util = require('util')

module.exports = (rawInput) => {
  const input = parseInput(rawInput)
  return input.reduceRight(
    ([v, cuboids], [on, cuboid]) => {
      const cur = [
        on ? v + volume(cuboid) - intersectionVolume(cuboid, cuboids) : v,
        [...cuboids, cuboid]
      ]
      return cur
    },
    [0, []]
  )[0]
}

const RE =
  /(on|off) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/

const parseInput = (input) =>
  input.split('\n').map((line) => {
    const [, b, ...coords] = RE.exec(line)
    const [x1, x2, y1, y2, z1, z2] = coords.map(Number)
    return [
      b === 'on',
      [
        [x1, x2],
        [y1, y2],
        [z1, z2]
      ]
    ]
  })

const intersectionVolume = (cuboid, cuboids) =>
  cuboids
    .map((c, i) => [intersect(c, cuboid), i])
    .filter(([c]) => c.every(([min, max]) => max >= min))
    .map(([c, i]) => volume(c) - intersectionVolume(c, cuboids.slice(i + 1)))
    .reduce((v, sum) => v + sum, 0)

const volume = (cuboid) =>
  cuboid.map(([a, b]) => b - a + 1).reduce((v, s) => v * s)

const intersect = (c1, c2) =>
  c1.map((c, i) => [Math.max(c[0], c2[i][0]), Math.min(c[1], c2[i][1])])

const log = (...data) => {
  console.log(util.inspect(data, false, 10))
}
