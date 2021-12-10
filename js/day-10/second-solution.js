module.exports = (arr) => {
  const res = 0
  const scores = []
  const inCompleteItems = []

  const pushers = ['(', '[', '{', '<']
  const poppers = [')', ']', '}', '>']
  const points = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
  }
  const calc = (s) => {
    let r = 0
    let i = 0
    while (s.length > 0) {
      const c = s.pop()

      r = r * 5 + points[c]
      i++
    }
    return r
  }
  isValid = (line) => {
    const myStack = []
    for (let i = 0; i < line.length; i++) {
      const c = line[i]
      const isPusher = pushers.indexOf(c)
      if (isPusher > -1) { myStack.push(poppers[isPusher]) } else if (myStack[myStack.length - 1] == c) { myStack.pop() } else {
        return 0
      }
    }
    const cc = calc(myStack)
    return cc
  }
  const s = arr.map((l) => isValid(l)).filter((l) => l)
  s.sort((x, y) => x - y)

  console.log('scores', Math.floor(s.length / 2), s)
  return s[Math.floor(s.length / 2)]
}
