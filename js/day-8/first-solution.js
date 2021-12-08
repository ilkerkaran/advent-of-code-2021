module.exports = (inputArr) => {
  let res = 0
  for (let i = 0; i < inputArr.length; i++) {
    const element = inputArr[i][1]
    for (let j = 0; j < element.length; j++) {
      const output = element[j]
      if ([2, 4, 3, 7].includes(output.length)) { res++ }
    }
  }
  return res
}
