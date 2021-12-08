module.exports = (inputArr) => {
  let res = 0

  const checker = (n, target) => target.split('').every((c) => n.split('').includes(c))
  const decode = (inp) => {
    const numMap = inp[0]
    const output = inp[1]
    const m = {}
    let remaningMap = [...numMap]
    // find easy number 1, 4, 7, 8
    remaningMap.map((nm) => {
      if (nm.length == 2) {
        m[1] = nm
      } else if (nm.length == 3) {
        m[7] = nm
      } else if (nm.length == 4) {
        m[4] = nm
      } else if (nm.length == 7) {
        m[8] = nm
      }
    })
    remaningMap = remaningMap.filter((nm) => nm.length !== 2 && nm.length !== 3 && nm.length !== 4 && nm.length !== 7)
    // find 3
    const possibleThrees = remaningMap.filter((nm) => nm.length === 5)
    for (let i = 0; i < possibleThrees.length; i++) {
      const possibleThree = possibleThrees[i]
      if (checker(possibleThree, m[1])) {
        m[3] = possibleThree
        break
      }
    }
    remaningMap = remaningMap.filter((nm) => nm !== m[3])
    // find 9
    const possibleNines = remaningMap.filter((nm) => nm.length === 6)
    for (let i = 0; i < possibleNines.length; i++) {
      const possibleNine = possibleNines[i]
      if (checker(possibleNine, m[3])) {
        m[9] = possibleNine
        break
      }
    }
    remaningMap = remaningMap.filter((nm) => nm !== m[9])
    // find 0
    const possibleZeros = remaningMap.filter((nm) => nm.length === 6)
    for (let i = 0; i < possibleZeros.length; i++) {
      const possibleZero = possibleZeros[i]
      if (checker(possibleZero, m[7])) {
        m[0] = possibleZero
        break
      }
    }
    remaningMap = remaningMap.filter((nm) => nm !== m[0])
    // find 6
    m[6] = remaningMap.filter((nm) => nm.length === 6)[0]
    remaningMap = remaningMap.filter((nm) => nm.length !== 6)
    // find 5
    const possibleFives = remaningMap.filter((nm) => nm.length === 5)
    for (let i = 0; i < possibleFives.length; i++) {
      const possibleFive = possibleFives[i]
      if (checker(m[6], possibleFive)) {
        m[5] = possibleFive
        break
      }
    }
    remaningMap = remaningMap.filter((nm) => nm !== m[5])
    // find 2
    m[2] = remaningMap.filter((nm) => nm.length === 5)[0]
    console.log(numMap, m)
    return +output.reduce((acc, o) => {
      const myMap = Object.entries(m)
      for (let i = 0; i < myMap.length; i++) {
        const element = myMap[i]
        let sortdVal = element[1].split('')
        sortdVal.sort()
        sortdVal = sortdVal.join('')
        let sortedItem = o.split('')
        sortedItem.sort()
        sortedItem = sortedItem.join('')
        if (sortedItem == sortdVal) {
          return acc + element[0]
        }
      }
    }, '')
  }
  res = inputArr.reduce((acc, i) => acc + decode(i), 0)

  return res
}
