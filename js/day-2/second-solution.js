module.exports = (arr) => {
  let h = 0; let v = 0
  let angle = 0
  arr.map((i) => {
    const c = i.split(' ')
    const d = c[0]
    const val = +c[1]
    if (d == 'forward') {
      h += val
      console.log(val, angle)
      v += (val * angle)
    } else if (d == 'up') {
      angle -= val
    } else if (d == 'down') {
      angle += val
    }
  })
  console.log(h, v)
  return h * v
}
