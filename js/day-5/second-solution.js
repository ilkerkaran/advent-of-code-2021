module.exports = (coordinates) => {
  let res = 0
  const visMap = []
  const fillMap = (coor) => {
    const hd = coor.a.x < coor.b.x
    const vd = coor.a.y < coor.b.y
    if (isDiagonal(coor)) {
      let j = coor.a.y
      for (let i = coor.a.x; hd ? i <= coor.b.x : i >= coor.b.x; i += hd ? 1 : -1) {
        if (!visMap[i]) { visMap[i] = [] }
        visMap[i][j] = (visMap[i][j] || 0) + 1
        j += vd ? 1 : -1
      }
    } else {
      for (let i = coor.a.x; hd ? i <= coor.b.x : i >= coor.b.x; i += hd ? 1 : -1) {
        for (let j = coor.a.y; vd ? j <= coor.b.y : j >= coor.b.y; j += vd ? 1 : -1) {
          if (!visMap[i]) { visMap[i] = [] }
          visMap[i][j] = (visMap[i][j] || 0) + 1
        }
      }
    }
  }
  const isDiagonal = (coor) => Math.abs(coor.a.x - coor.b.x) == Math.abs(coor.a.y - coor.b.y)

  for (let i = 0; i < coordinates.length; i++) {
    const coor = coordinates[i]
    console.log(i, isDiagonal(coor))
    if (coor.a.x == coor.b.x
      || coor.a.y == coor.b.y
      || isDiagonal(coor)) {
      console.log(i)
      fillMap(coor)
    }
  }
  visMap.map((i) => i.map((j) => { if (j >= 2)res++ }))
  return res
}
