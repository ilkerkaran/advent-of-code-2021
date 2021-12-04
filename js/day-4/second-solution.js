module.exports = (numbers, cards) => {
  let res = 0
  const numArr = numbers.split(',').map((i) => +i)
  let curState = {}
  let bingoCount = {}
  let bc = 0
  const cardMap = cards.reduce((acc, c, i) => {
    const f = c.split('\n').map((r) => r.split(' ').filter((n) => n).map((n) => +n))
    let m = {}
    for (let j = 0; j < f.length; j++) {
      const element = f[j]
      for (let k = 0; k < element.length; k++) {
        const elem = element[k]
        m = { ...m, [elem]: [j, k] }
      }
    }

    return {
      ...acc,
      [i]: { ...m }
    }
  }, {})

  const progress = (curNum) => {
    let bingo = -1
    const array = Object.entries(cardMap)
    for (let i = 0; i < array.length; i++) {
      const card = array[i]

      const cardIndex = card[0]
      const cardNumbers = card[1]
      if (cardNumbers && cardNumbers[curNum]) {
        curState = {
          ...curState,
          [cardIndex]: {
            r: {
              ...(curState[i] || {}).r,
              [cardNumbers[curNum][0]]: (+(curState[cardIndex] ? curState[cardIndex].r[cardNumbers[curNum][0]] || 0 : 0) + 1)
            },
            c: {
              ...(curState[i] || {}).c,
              [cardNumbers[curNum][1]]: (+(curState[cardIndex] ? curState[cardIndex].c[cardNumbers[curNum][1]] || 0 : 0) + 1)
            }
          }
        }
        cardNumbers[curNum] = undefined
        if (!bingoCount[i] && (Object.values(curState[cardIndex].r).some((x) => +x > 4) || Object.values(curState[cardIndex].c).some((x) => +x > 4))) {
          bingo = i
          console.log('bingooo')
          bingoCount = { ...bingoCount, [i]: true }
          bc++
          console.log(Object.keys(cardMap).length, Object.values(bingoCount).filter((b) => b).length)
        }
      }
    }
    console.log('bingoIndex', bingo)
    return bingo
  }

  const finalise = (cardIndex, curNum) => {
    const card = cardMap[cardIndex]
    const sum = Object.keys(card).filter((k) => !!card[k]).reduce((acc, n) => +n + acc, 0)
    return sum * +curNum
  }

  for (let i = 0; i < numArr.length; i++) {
    const curNum = numArr[i]
    const h = progress(curNum)
    if (Object.keys(cardMap).length == Object.values(bingoCount).filter((b) => b).length) {
      res = finalise(h, curNum)
      break
    }
  }

  return res
}
