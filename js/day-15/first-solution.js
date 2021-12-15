module.exports = (arr) => {
  const graph = {}
  const start = '0_0'
  const end = `${arr.length - 1}_${arr[arr.length - 1].length - 1}`
  const controlNext = (i, j) => {
    if (arr[i] && arr[i][j] != undefined) {
      return [`${i}_${j}`, arr[i][j]]
    }
  }
  const getNextPaths = (i, j) => {
    const n = []
    if (!(i == arr.length - 1 && j == arr[arr.length - 1].length - 1)) {
      n.push(controlNext(i - 1, j))
      n.push(controlNext(i + 1, j))
      n.push(controlNext(i, j - 1))
      n.push(controlNext(i, j + 1))
    }
    return n.filter((a) => a)
  }

  for (let i = 0; i < arr.length; i++) {
    const line = arr[i]
    for (let j = 0; j < line.length; j++) {
      const node = line[j]
      const nexts = getNextPaths(i, j)

      graph[`${i}_${j}`] = nexts.reduce((acc, [n, v]) => ({ ...acc, [n]: +v }), {})
    }
  }

  const shortestDistanceNode = (distances, visited) => {
    // create a default value for shortest
    let shortest = null

    // for each node in the distances object
    for (const node in distances) {
      // if no node has been assigned to shortest yet
      // or if the current node's distance is smaller than the current shortest
      const currentIsShortest = shortest === null || distances[node] < distances[shortest]

      // and if the current node is in the unvisited set
      if (currentIsShortest && !visited.includes(node)) {
        // update shortest to be the current node
        shortest = node
      }
    }
    return shortest
  }

  const findShortestPath = (startNode, endNode) => {
    // track distances from the start node using a hash object
    let distances = {}
    distances[endNode] = 'Infinity'
    distances = Object.assign(distances, graph[startNode])
    // track paths using a hash object
    const parents = { endNode: null }
    for (const child in graph[startNode]) {
      parents[child] = startNode
    }

    // collect visited nodes
    const visited = []
    // find the nearest node
    let node = shortestDistanceNode(distances, visited)

    // for that node:
    while (node) {
    // find its distance from the start node & its child nodes
      const distance = distances[node]
      const children = graph[node]

      // for each of those child nodes:
      for (const child in children) {
        // make sure each child node is not the start node
        if (String(child) === String(startNode)) {
          continue
        } else {
          // save the distance from the start node to the child node
          const newdistance = distance + children[child]
          // if there's no recorded distance from the start node to the child node in the distances object
          // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
          if (!distances[child] || distances[child] > newdistance) {
            // save the distance to the object
            distances[child] = newdistance
            // record the path
            parents[child] = node
          }
        }
      }
      // move the current node to the visited set
      visited.push(node)
      // move to the nearest neighbor node
      node = shortestDistanceNode(distances, visited)
    }

    // using the stored paths from start node to end node
    // record the shortest path
    const shortestPath = [endNode]
    let parent = parents[endNode]
    while (parent) {
      shortestPath.push(parent)
      parent = parents[parent]
    }
    shortestPath.reverse()

    // this is the shortest path
    const results = {
      distance: distances[endNode],
      path: shortestPath
    }
    // return the shortest path & the end node's distance from the start node
    return results
  }
  console.log('start', new Date())
  const shortestPath = findShortestPath(start, end)
  console.log('end', new Date())
  console.log('shortestPath', shortestPath)
  return shortestPath.distance
}
