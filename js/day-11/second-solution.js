module.exports = (inputMap, step) => {
  const increasePos = (i, j) => {
    if (inputMap[i] && (inputMap[i][j] != undefined)) {
      inputMap[i][j] += 1
      return inputMap[i][j]
    }
    return null
  }

  const increaseAdjesants = (i, j, m) => {
    if (!m[`${i}_${j}`]) {
      m[`${i}_${j}`] = true
      const n = increasePos(i, j - 1)
      const ne = increasePos(i - 1, j + 1)
      const e = increasePos(i, j + 1)
      const se = increasePos(i + 1, j + 1)
      const s = increasePos(i + 1, j)
      const sw = increasePos(i + 1, j - 1)
      const w = increasePos(i - 1, j)
      const nw = increasePos(i - 1, j - 1)

      checkAndIncrement(n, i, j - 1, m)
      checkAndIncrement(ne, i - 1, j + 1, m)
      checkAndIncrement(e, i, j + 1, m)
      checkAndIncrement(se, i + 1, j + 1, m)
      checkAndIncrement(s, i + 1, j, m)
      checkAndIncrement(sw, i + 1, j - 1, m)
      checkAndIncrement(w, i - 1, j, m)
      checkAndIncrement(nw, i - 1, j - 1, m)
    }
  }

  const checkAndIncrement = (num, i, j, m) => {
    if (num > 9 && inputMap[i] && (inputMap[i][j] != undefined)) {
      increaseAdjesants(i, j, m)
    }
  }
  const proceed = (arr) => {
    let flashCount = 0
    // normal increase
    for (let i = 0; i < arr.length; i++) {
      const line = arr[i]
      for (let j = 0; j < line.length; j++) {
        const c = increasePos(i, j)
      }
    }

    // increase because of flashes
    const triggerMap = {}
    for (let i = 0; i < arr.length; i++) {
      const line = arr[i]
      for (let j = 0; j < line.length; j++) {
        if (inputMap[i][j] > 9) {
          increaseAdjesants(i, j, triggerMap)
        }
      }
    }

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        const e = inputMap[i][j]
        if (e > 9) {
          inputMap[i][j] = 0
          flashCount++
        }
      }
    }

    return flashCount
  }
  const printArr = (desc) => {
    const p = inputMap.map((i) => i.join(',')).join('\n')
    console.log('arr', desc, `\n${p}`)
  }
  let i = 0
  while (true) {
    const curFlashes = proceed(inputMap)
    if (curFlashes == 100) { printArr(`${curFlashes}, iteration ${i + 1}`) }
    if (curFlashes == 100) { return i + 1 }
    i += 1
  }
}
