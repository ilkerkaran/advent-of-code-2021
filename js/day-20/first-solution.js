module.exports = (rawStr) => {
  const [enchancement, imgStr] = rawStr.split('\n\n')
  const enchancementArr = enchancement.split('').map((c) => (c == '#' ? 1 : 0))
  let imgGrid = imgStr
    .split('\n')
    .map((l) => l.split('').map((c) => (c == '#' ? 1 : 0)))
  let jokerPxl = 0
  const extendImg = (n = 0) => {
    const frameXLength = imgGrid[0].length + 2

    imgGrid.map((l) => {
      l.unshift(n)
      l.push(...[n])
    })
    imgGrid.unshift(Array.from({ length: frameXLength }, () => n))
    imgGrid.push(...[Array.from({ length: frameXLength }, () => n)])
  }
  const sumLights = () => {
    return imgGrid.reduce((acc, l) => acc + l.reduce((s, n) => s + n, 0), 0)
  }
  const print = () => {
    const s = imgGrid.map((l) => l.join('')).join('\n')
    console.log('img is')
    console.log(s)
    console.log(imgStr.length, s.length)
  }

  const pxl = (i, j) => (imgGrid[i] && imgGrid[i][j]) ?? jokerPxl
  const processImg = () => {
    const out = []
    for (let i = 0; i < imgGrid.length; i++) {
      const line = imgGrid[i]
      for (let j = 0; j < line.length; j++) {
        const bn = `${pxl(i - 1, j - 1)}${pxl(i - 1, j)}${pxl(
          i - 1,
          j + 1
        )}${pxl(i, j - 1)}${pxl(i, j)}${pxl(i, j + 1)}${pxl(i + 1, j - 1)}${pxl(
          i + 1,
          j
        )}${pxl(i + 1, j + 1)}`
        const eIndex = parseInt(bn, 2)
        const newPx = enchancementArr[eIndex]
        if (!out[i]) out[i] = []
        out[i][j] = newPx
      }
    }
    return out
  }
  // print()
  for (let i = 0; i < 50; i++) {
    jokerPxl = enchancementArr[0] % 2 ? i % 2 : 0
    extendImg(jokerPxl)
    extendImg(jokerPxl)
    extendImg(jokerPxl)
    extendImg(jokerPxl)
    extendImg(jokerPxl)
    const out = processImg()
    imgGrid = out
    // print()
  }
  const sum = sumLights()
  console.log('sum', sum)
}
// 6263
// 5834
// 5503
// 5107
// 5508
// 5503
