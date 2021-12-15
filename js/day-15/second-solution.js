module.exports = (arr) => {
  const graph = {}

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
  const originalXLength = arr.length
  const originalYLength = arr[0].length
  // expand arr
  for (let m = 0; m < 5; m++) {
    for (let n = 0; n < 5; n++) {
      for (let i = 0; i < originalXLength; i++) {
        for (let j = 0; j < originalYLength; j++) {
          const xOffset = m * originalXLength
          const yOffset = n * originalYLength
          const newVal = +arr[i][j] + m + n
          if (!arr[xOffset + i]) { arr[xOffset + i] = [] }
          if (!arr[xOffset + i][yOffset + j]) { arr[xOffset + i][yOffset + j] = newVal > 9 ? newVal - 9 : newVal }
        }
      }
    }
  }

  const start = '0_0'
  const end = `${arr.length - 1}_${arr[arr.length - 1].length - 1}`

  for (let i = 0; i < arr.length; i++) {
    const line = arr[i]
    for (let j = 0; j < line.length; j++) {
      const node = line[j]
      const nexts = getNextPaths(i, j)

      graph[`${i}_${j}`] = nexts.reduce((acc, [n, v]) => ({ ...acc, [n]: +v }), {})
    }
  }
  console.log('start', new Date())
  const grid = arr.map((line) => line.map((n) => ({ difficulty: +n })))

  const aStarInstance = new AStar([0, 0], [arr.length - 1, arr[arr.length - 1].length - 1], grid)
  // console.log('instance', aStarInstance)
  aStarInstance.startAlgorithm()
  const { optimalPath } = aStarInstance

  let sum = arr[arr.length - 1][arr[arr.length - 1].length - 1]

  optimalPath.forEach((node, i) => {
    if (i == 0 || i == optimalPath.length - 1) { return }
    sum += node.difficulty
  })

  console.log('end', new Date())
  console.log('shortestPath', sum)
  return sum
}

class NodeElement {
  constructor(row, col, difficulty, isWall, aStarInstance) {
    this.row = row
    this.col = col
    this.wall = isWall
    this.difficulty = difficulty
    this.through = ''
    this.heuristic = Infinity
    this.eucledianDistance = Infinity
    this.difficultySums = ''
    this.aStar = aStarInstance
    this.neighbours = []
  }

  heuristicCalculation(node) {
    this.eucledianDistance = this.aStar.eucledianDistance(this)
    let difficultySums
    difficultySums = this.difficulty + Number(node.difficultySums)
    if (this.difficultySums === '') {
      this.difficultySums = difficultySums
      this.through = node
    } else if (this.difficultySums > difficultySums) {
      this.difficultySums = difficultySums
      this.through = node
    } else {
    }
    return this.heuristic = this.eucledianDistance + this.difficultySums
  }

  neighboursCalculation(openQueue) {
    const neighbours = []
    let enqueuedNode
    let newNode

    if (this.row < this.aStar.matrixRowLenght - 1) {
      enqueuedNode = openQueue.find((node) => node.row === this.row + 1 && node.col === this.col)
      if (!enqueuedNode) {
        newNode = this.aStar.nodes.find((node) => (node.row === this.row + 1 && node.col === this.col))
        if (newNode.wall === false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode)) {
          newNode.heuristicCalculation(this)
          neighbours.push(newNode)
        }
      } else {
        enqueuedNode.heuristicCalculation(this)
      }
    }
    if (this.col < this.aStar.matrixColumnLenght - 1) {
      enqueuedNode = openQueue.find((node) => node.row === this.row && node.col === this.col + 1)
      if (!enqueuedNode) {
        newNode = this.aStar.nodes.find((node) => (node.row === this.row && node.col === this.col + 1))
        if (newNode.wall === false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode)) {
          newNode.heuristicCalculation(this)
          neighbours.push(newNode)
        }
      } else {
        enqueuedNode.heuristicCalculation(this)
      }
    }
    if (this.row > 0) {
      enqueuedNode = openQueue.find((node) => node.row === this.row - 1 && node.col === this.col)
      if (!enqueuedNode) {
        newNode = this.aStar.nodes.find((node) => (node.row === this.row - 1 && node.col === this.col))
        if (newNode.wall === false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode)) {
          newNode.heuristicCalculation(this)
          neighbours.push(newNode)
        }
      } else {
        enqueuedNode.heuristicCalculation(this)
      }
    }
    if (this.col > 0) {
      enqueuedNode = openQueue.find((node) => node.row === this.row && node.col === this.col - 1)
      if (!enqueuedNode) {
        newNode = this.aStar.nodes.find((node) => (node.row === this.row && node.col === this.col - 1))
        if (newNode.wall === false && !this.aStar.alreadyChecked.includes(newNode) && !this.aStar.openQueue.includes(newNode)) {
          newNode.heuristicCalculation(this)
          neighbours.push(newNode)
        }
      } else {
        enqueuedNode.heuristicCalculation(this)
      }
    }
    return neighbours
  }
}

class AStar {
  constructor(start, end, grid) {
    this.grid = grid
    this.matrixRowLenght = end[0] + 1
    this.matrixColumnLenght = end[1] + 1
    this.nodes = []
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (i == start[0] && j == start[1]) {
          this.start = new NodeElement(i, j, grid[i][j].difficulty, false, this)
          this.nodes.push(this.start)
        } else if (i == end[0] && j == end[1]) {
          this.end = new NodeElement(i, j, grid[i][j].difficulty, false, this)
          this.nodes.push(this.end)
        } else {
          this.nodes.push(new NodeElement(i, j, grid[i][j].difficulty, false, this))
        }
      }
    }
    this.openQueue = [this.start]
    this.alreadyChecked = []
    this.optimalPath = []
  }

  startAlgorithm() {
    this.openQueue[0].heuristicCalculation(this.openQueue[0])

    while (this.openQueue.length > 0) {
      if (this.openQueue[0] === this.end) {
        break
      }
      const neighbours = this.openQueue[0].neighboursCalculation(this.openQueue)
      const queue = this.openQueue
      this.alreadyChecked.push(queue.shift())
      const newQueue = queue.concat(neighbours)
      const sortedNeighbours = newQueue.sort((a, b) => a.heuristic - b.heuristic)
      this.openQueue = sortedNeighbours
    }
    if (this.openQueue.length !== 0) { this.retrieveOptimalPath(this.openQueue[0]) }
  }

  retrieveOptimalPath(node) {
    this.optimalPath.push(node)
    if (node.through !== this.start) {
      this.retrieveOptimalPath(node.through)
    } else {
      this.optimalPath.push(this.start)
    }
  }

  eucledianDistance(node) {
    // |𝑎−𝑐|+|𝑏−𝑑|
    return 1 + (Math.abs(node.row - this.end.row) + Math.abs(node.col - this.end.col))

    // return Math.sqrt(Math.pow(Math.abs(node.row - this.end.row), 2) + Math.pow(Math.abs(node.col - this.end.col), 2))
  }
}
