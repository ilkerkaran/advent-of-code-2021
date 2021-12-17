module.exports = (rawStr) => {
  const target = rawStr.substring(13).split(', ').map((c) => c.substring(2).split('..'))
  const maxVerticalDist = Math.min(...target[1])
  console.log('t', maxVerticalDist)
  let diff = Math.abs(maxVerticalDist)
  let curVerticalCoor = maxVerticalDist
  while (diff > 0) {
    curVerticalCoor += diff
    diff--
  }
  return curVerticalCoor
}
