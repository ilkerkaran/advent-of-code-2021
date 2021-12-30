module.exports = (rawStr) => {
  const lines = rawStr.split('\n')
  const matrix = lines.map((l) =>
    l.split('').map((c) => (c === '.' ? undefined : c))
  )
  const rl = matrix.length
  const cl = matrix[0].length
  let shifted = 0
  let markToSave = []
  let markToDelete = []
  const markShiftDown = () => {
    shifted = 0
    for (let i = 0; i < rl; i++) {
      const nextI = i == rl - 1 ? 0 : i + 1
      for (let j = 0; j < cl; j++) {
        if (matrix[i][j] == 'v' && !matrix[nextI][j]) {
          markToSave.push([nextI, j])
          markToDelete.push([i, j])
          shifted++
        }
      }
    }
  }
  const markShiftRight = () => {
    shifted = 0
    for (let i = 0; i < rl; i++) {
      for (let j = 0; j < cl; j++) {
        const nextJ = j == cl - 1 ? 0 : j + 1
        if (matrix[i][j] == '>' && !matrix[i][nextJ]) {
          markToSave.push([i, nextJ])
          markToDelete.push([i, j])
          shifted++
        }
      }
    }
  }

  const shift = (d) => {
    for (let index = 0; index < markToSave.length; index++) {
      const [i, j] = markToSave[index]
      const [deleteI, deleteJ] = markToDelete[index]
      matrix[i][j] = d
      delete matrix[deleteI][deleteJ]
    }
    const res = markToDelete.length
    markToDelete = []
    markToSave = []
    return res
  }
  let counter = 0
  let totalStepShift = 0

  const log = () => {
    let str = ''
    for (let i = 0; i < rl; i++) {
      for (let j = 0; j < cl; j++) {
        str += matrix[i][j] || '.'
      }

      str += '\n'
    }
  }
  do {
    totalStepShift = 0
    markShiftRight()
    totalStepShift += shift('>')
    markShiftDown()
    totalStepShift += shift('v')
    counter++
  } while (totalStepShift)
  return counter
}
