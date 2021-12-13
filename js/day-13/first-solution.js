module.exports = (input, input2) => {
  // craete paper
  const paper = input.split('\n').map((l) => {
    const coor = l.split(',')
    return { x: +coor[0], y: +coor[1] }
  })

  // create instructions
  const xx = input2.split('\n')
  const instructions = xx.map((yy) => yy.split(' ')[2])

  // end of preperation
  const maxCoor = { x: Math.max(...paper.map((p) => p.x)), y: Math.max(...paper.map((p) => p.y)) }
  console.log('Max', maxCoor)

  const fold = (dir, i) => {
    const foldedState = []
    const max = (dir == 'x') ? maxCoor.x : maxCoor.y
    // merge dots
    let rIndex = i - 1
    const controlledAdd = (x, y) => {
      if (foldedState.findIndex((fs) => fs.x == x && fs.y == y) < 0) { foldedState.push({ x, y }) }
    }

    for (let index = i + 1; index <= max; index++) {
      if (dir == 'x') {
        paper.map((p) => {
          if (p.x == index || p.x == rIndex) { controlledAdd(rIndex, p.y) }
        })
      } else {
        paper.map((p) => {
          if (p.y == index || p.y == rIndex) { controlledAdd(p.x, rIndex) }
        })
      }

      rIndex--
    }
    return foldedState
    // complete folding
  }

  const foldedOnce = fold('x', 655)
  console.log('paper', foldedOnce.length, foldedOnce)
}
