module.exports = (str, second, steps) => {
  const inputMap = second.split('\n').map((s) => s.split(' -> ')).reduce((acc, [req, target]) => ({ ...acc, [req]: target }), {})
  let res = str
  const m = {}
  res.split('').map((x) => {
    if (m[x]) { m[x] += 1 } else { m[x] = 1 }
  })
  const proceed = (s) => {
    for (let i = 0; i < s.length; i++) {
      const element = s[i]

      const t = inputMap[`${element}${s[i + 1]}`]
      if (t) {
        s.splice(i + 1, 0, t)
        i++
        if (m[t]) { m[t] += 1 } else { m[t] = 1 }
      }
    }
    return s
  }
  res = res.split('')
  for (let xx = 0; xx < steps; xx++) {
    res = proceed(res)
    // console.log(`after ${xx + 1}; ${res}`)
  }

  return Math.max(...Object.values(m)) - Math.min(...Object.values(m))
}
