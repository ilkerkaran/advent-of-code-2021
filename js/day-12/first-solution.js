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
  const recursion = (u, d, pathCount, usage) => {
    if (!usage) { usage = {} }
    if (u == d) {
      pathCount++
    } else {
      for (let i = 0; i < m[u].length; i++) {
        const n = m[u][i]
        if (!usage[u]) {
          if (isSmallCave(u)) { usage[u] = true }
          pathCount = recursion(n, d, pathCount, usage)
          usage[u] = false
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
  console.log('m', m)
  const total = findPaths()
  return total
}
