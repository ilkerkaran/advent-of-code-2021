module.exports = (rawStr) => {
  const snailNums = rawStr.split('\n')
  const r = /[0-9]/
  const reduceSnailNum = (sn) => {
    const explode = (f, l) => {
      let leftSide = sn.substring(0, f)
      let rightSide = sn.substr(l + 1)
      const [leftNum, rightNum] = sn.substr(f + 1, l - f - 1).split(',')

      // handle left side
      const lastNumOnLeft = findLastNum(leftSide)
      if (lastNumOnLeft && lastNumOnLeft.i > -1) {
        leftSide = addNum(leftSide, lastNumOnLeft, leftNum)
      }
      // handle right side
      const firstNumOnRight = findFirstNum(rightSide)
      if (firstNumOnRight.i > -1) {
        rightSide = addNum(rightSide, firstNumOnRight, rightNum)
      }
      sn = `${leftSide}0${rightSide}`
    }
    const spl = (numObj) => {
      const { i, n } = numObj
      const snArr = sn.split('')
      snArr.splice(i, n.length, `[${Math.floor(+n / 2)},${Math.ceil(+n / 2)}]`)
      sn = snArr.join('')
    }

    const checkExplosion = () => {
      let open = 0
      const snArr = sn.split('')
      let prev = ''
      let prevIndex = -1
      for (let i = 0; i < snArr.length; i++) {
        const c = snArr[i]
        if (c == '[') {
          open++
          prev = '['
          prevIndex = i
        } else if (c == ']') {
          if (open >= 5 && prev == '[') {
            explode(prevIndex, i)
            return true
          }
          open--
          prevIndex = i
          prev = ']'
        }
      }
      return false
    }

    const checkExplosions = () => {
      let exploded = false
      do {
        exploded = checkExplosion()
      } while (exploded)
    }

    for (let i = 0; i < sn.length; i++) {
      const c = sn[i]
      if (!c) break
      checkExplosions()
      let splOffset = 0
      while (splOffset < sn.length) {
        const curNum = findFirstNum(sn, splOffset)
        if (curNum.i > -1) {
          if (curNum.n.length > 1) {
            spl(curNum)
            splOffset = 0
            i = 0
            break
          } else splOffset = curNum.i + 1
        } else break
      }
    }

    return sn
  }
  const addNum = (sn, numObj, newNum) => {
    const items = sn.split('')
    items.splice(numObj.i, numObj.n.length, `${+numObj.n + +newNum}`)
    const newSn = items.join('')
    return newSn
  }
  let totalMag = 0
  const calcMagnitude = (str) => {
    const [curMag, f, l, isLast] = calcPair(str)
    totalMag = curMag
    if (isLast) return totalMag
    const leftSide = str.substring(0, f)
    const rightSide = str.substr(l + 1)
    str = leftSide + curMag + rightSide
    if (f !== 0 || l + 1 == str.length) calcMagnitude(str)
  }

  const findLastNum = (str) =>
    str.split('').reduce(
      (cur, c, i, arr) => {
        if (!c.search(r)) {
          if (i == 0 || arr[i - 1].search(r) == -1) return { i, n: c }
          return { ...cur, n: cur.n + c }
        }
        return cur
      },
      { i: -1, n: '' }
    )

  const findFirstNum = (str, offset = 0) => {
    let index = -1
    let n = ''
    const strArr = str.split('')
    for (let i = offset; i < strArr.length; i++) {
      const element = strArr[i]
      if (!element.search(r)) {
        if (n) {
          n += element
        } else {
          n = element
          index = i
        }
      } else if (index > -1) break
    }

    return { i: index, n }
  }

  const calcPair = (str) => {
    const snArr = str.split('')
    let open = 0
    let prev = ''
    let prevIndex = -1
    let l
    let f
    for (let i = 0; i < snArr.length; i++) {
      const c = snArr[i]
      if (!c) continue

      if (c == '[') {
        open++
        prev = '['
        prevIndex = i
      } else if (c == ']') {
        if (prev == '[') {
          l = i
          f = prevIndex
          break
        }

        prevIndex = i
        prev = ']'
      }
    }

    const [first, second] = str
      .substring(f + 1, l)
      .split(',')
      .map((n) => +n)
    return [first * 3 + second * 2, f, l, open <= 1]
  }
  let curSn = snailNums[0]
  for (let i = 1; i < snailNums.length; i++) {
    const ssn = snailNums[i]
    curSn = `[${curSn},${ssn}]`
    console.log('b', curSn)

    curSn = reduceSnailNum(curSn)
    console.log('a', curSn)
  }

  calcMagnitude(curSn)
  return totalMag
  // reduceSnailNum(a)
}
