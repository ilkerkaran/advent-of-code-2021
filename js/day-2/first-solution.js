module.exports = (arr) => {
  let h = 0; let v = 0
  arr.map((i) => {
    const c = i.split(' ')
    const d = c[0]
    const val = +c[1]
    if (d == 'forward') {
      h += val
    } else if (d == 'up') {
      v -= val
    } else if (d == 'down') {
      v += val
    }
  })

  return h * v
}
