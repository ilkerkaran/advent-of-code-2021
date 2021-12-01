const secondSolution = (inputStr) => {
  const arr = inputStr.split('\n').map((s) => +s)
  let c = 0
  for (let i = 1; i < arr.length - 2; i += 1) {
    if (arr[i + 2] > arr[i - 1]) { c += 1 }
  }
  return c
}

module.exports = secondSolution
