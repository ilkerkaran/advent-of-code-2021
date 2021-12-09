module.exports = (inputMap) => {
  let res = 0
  const isSmallest = (i, j) => (!inputMap[i - 1] || (inputMap[i][j] < inputMap[i - 1][j]) || (inputMap[i - 1][j] == undefined))
    && (!inputMap[i + 1] || (inputMap[i][j] < inputMap[i + 1][j]) || (inputMap[i + 1][j] == undefined))
    && ((inputMap[i][j] < inputMap[i][j - 1]) || (inputMap[i][j - 1] == undefined))
     && ((inputMap[i][j] < inputMap[i][j + 1]) || (inputMap[i][j + 1] == undefined))
  for (let i = 0; i < inputMap.length; i++) {
    const line = inputMap[i]
    for (let j = 0; j < line.length; j++) {
      const x = line[j]
      if (isSmallest(i, j)) {
        res += x + 1
      }
    }
  }
  return res
}
