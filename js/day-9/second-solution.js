module.exports = (inputMap) => {
  const lowPoints = []
  const res = []
  let third = 0
  let second = 0
  let first = 0

  const setTopThree = (cur) => {
    if (cur > third) { third = cur } else return
    if (cur > second) {
      third = second
      second = cur
    } else return
    if (cur > first) {
      second = first
      first = cur
    }
  }

  const findSize = (i, j, m) => {
    m[`${i}_${j}`] = true
    if (inputMap[i + 1] && inputMap[i + 1][j] < 9 && (inputMap[i][j] < inputMap[i + 1][j]) && !m[`${i + 1}_${j}`]) {
      m = { ...m, ...findSize(i + 1, j, m) }
    }
    if (inputMap[i - 1] && inputMap[i - 1][j] < 9 && (inputMap[i][j] < inputMap[i - 1][j]) && !m[`${i - 1}_${j}`]) {
      m = { ...m, ...findSize(i - 1, j, m) }
    }
    if ((inputMap[i][j + 1] < 9 && inputMap[i][j] < inputMap[i][j + 1]) && !m[`${i}_${j + 1}`]) {
      m = { ...m, ...findSize(i, j + 1, m) }
    }
    if ((inputMap[i][j - 1] < 9 && inputMap[i][j] < inputMap[i][j - 1]) && !m[`${i}_${j - 1}`]) {
      m = { ...m, ...findSize(i, j - 1, m) }
    }

    return m
  }
  const isSmallest = (i, j) => (!inputMap[i - 1] || (inputMap[i][j] < inputMap[i - 1][j]) || (inputMap[i - 1][j] == undefined))
    && (!inputMap[i + 1] || (inputMap[i][j] < inputMap[i + 1][j]) || (inputMap[i + 1][j] == undefined))
    && ((inputMap[i][j] < inputMap[i][j - 1]) || (inputMap[i][j - 1] == undefined))
     && ((inputMap[i][j] < inputMap[i][j + 1]) || (inputMap[i][j + 1] == undefined))
  for (let i = 0; i < inputMap.length; i++) {
    const line = inputMap[i]
    for (let j = 0; j < line.length; j++) {
      const x = line[j]
      if (isSmallest(i, j)) {
        lowPoints.push({ i, j })
      }
    }
  }

  lowPoints.map((p) => {
    const curMap = findSize(p.i, p.j, {})
    const curSize = Object.keys(curMap).length
    setTopThree(curSize)
    setTopThree(Object.keys(curSize).length)
  })
  res.sort((x, y) => y - x)
  return first * second * third
}
