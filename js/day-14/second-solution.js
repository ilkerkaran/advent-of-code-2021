module.exports = (initialSeq, second, steps) => {
  const charCounter = {}
  const incrementChar = (c, num = 1) => {
    if (charCounter[c]) { charCounter[c] += num } else { charCounter[c] = num }
  }
  initialSeq = initialSeq.split('')
  initialSeq.map((x) => {
    incrementChar(x)
  })
  const inputMap = second.split('\n').map((s) => s.split(' -> ')).reduce((acc, [req, t]) => {
    const [f, l] = req.split('')
    return {
      ...acc, [req]: { next: [`${f}${t}`, `${t}${l}`], owner: t, cur: 0 }
    }
  }, {})
  // set initial counts
  for (let i = 1; i < initialSeq.length; i++) {
    const element = initialSeq[i - 1] + initialSeq[i]
    inputMap[element].cur++
  }

  const proceed = () => {
    const snapshot = JSON.parse(JSON.stringify(inputMap))
    // reset curs of main obj
    Object.values(inputMap).map((obj) => { obj.cur = 0 })
    Object.entries(snapshot).map((e) => {
      const [key, obj] = e
      const [next1, next2] = obj.next
      inputMap[next1].cur += obj.cur
      inputMap[next2].cur += obj.cur
      incrementChar(obj.owner, obj.cur)
    })
  }

  for (let xx = 0; xx < steps; xx++) {
    proceed()
  }
  return Math.max(...Object.values(charCounter)) - Math.min(...Object.values(charCounter))
}
