module.exports = (arr) => {
  const l = arr[0].length

  const getTargetBit = (arr, i, isGreater, decider) => {
    let ret = 0
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index]
      if (element[i] == 1) { ret++ } else ret--
    }
    return decider ? ret > 0 ? 1 : ret == 0 ? decider : 0 : ret > 0 ? 0 : ret == 0 ? decider : 1
  }
  const filterByIndexAndBit = (arr, i, decider) => arr.filter((x) => x.split('')[i] == decider)
  let aTmpArr = [...arr]
  let bTmpArr = [...arr]

  let index = 0
  while (true) {
    const aTarget = getTargetBit(aTmpArr, index, true, 1)
    const bTarget = getTargetBit(bTmpArr, index, false, 0)
    if (aTmpArr.length > 1) {
      aTmpArr = filterByIndexAndBit(aTmpArr, index, aTarget)
    }
    if (bTmpArr.length > 1) {
      bTmpArr = filterByIndexAndBit(bTmpArr, index, bTarget)
    }
    index++
    if (index == l || (aTmpArr.length <= 1 && bTmpArr.length <= 1)) { break }
  }
  return parseInt(bTmpArr[0], 2) * parseInt(aTmpArr[0], 2)
}
