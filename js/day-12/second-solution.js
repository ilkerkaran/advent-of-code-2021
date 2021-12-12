module.exports = (rawInput) => {
  const start = 'start'
  const end = 'end'
  const m = {}

  const createMap = () => {
    for (let i = 0; i < rawInput.length; i++) {
      const [left, right] = rawInput[i]
      addAdj(left, right)
      if (left != start && right !== end) { addAdj(right, left) }
    }
  }
  const addAdj = (l, r) => {
    if (r !== start) {
      if (m[l]) { m[l].push(r) } else m[l] = [r]
    }
  }
  createMap()

  // ------------ Create Graph ends
  const recursion = (u, d, pathCount, usage, str, isUsed) => {
    str = `${str || ''}-${u}`
    if (!usage) { usage = {} }
    if (u == d) {
      pathCount++
      // console.log('path', str)
      str = ''
    } else {
      for (let i = 0; i < m[u].length; i++) {
        const n = m[u][i]
        const isUsedPass = isUsed ? (usage[u] < 1) : (usage[u] < 2)
        if (usage[u] == undefined || isUsedPass) {
          if (isSmallCave(u)) {
            if (usage[u]) usage[u] += 1
            else usage[u] = 1
          }

          pathCount = recursion(n,
            d,
            pathCount,
            usage,
            str,
            isUsed || usage[u] == 2)
          if (usage[u]) { usage[u] -= 1 }
        }
      }
    }
    return pathCount
  }
  const findPaths = () => {
    let pathCount = 0

    pathCount = recursion(start, end,
      pathCount)
    return pathCount
  }

  const isSmallCave = (n) => n.toLowerCase() === n
  const total = findPaths()
  return total
}
