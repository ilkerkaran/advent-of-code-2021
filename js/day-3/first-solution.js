module.exports = (arr) => {
  const h = 0; const v = 0
  let gamma = ''
  let epsilon = ''
  const c = []
  const decide = (x, i) => {
    if (x[i] == 1) {
      c[i] = (c[i] || 0) + 1
    } else {
      c[i] = (c[i] || 0) - 1
    }
  }
  arr.map((x) => x.split('')).map((x) => {
    for (let index = 0; index < 12; index++) {
      decide(x, index)
    }
  })

  c.map((i) => {
    if (i > 0) {
      gamma += '1'
      epsilon += '0'
    } else {
      gamma += '0'
      epsilon += '1'
    }
  })
  console.log(gamma, epsilon)
  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}
