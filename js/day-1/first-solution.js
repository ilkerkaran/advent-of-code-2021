const firstSolution = (inputStr) => {
  let c = 0
  const arr = inputStr.split('\n').map((s) => +s)
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] > arr[i - 1]) { c += 1 }
  }
  return c
}

module.exports = firstSolution
