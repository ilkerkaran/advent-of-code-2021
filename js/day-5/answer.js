const input = require('./input')
const dummyInput = require('./dummyInput')
const firstSolution = require('./first-solution')
const secondSolution = require('./second-solution')

const coordinates = input.split('\n').map((i) => i.split(' -> ')).map((line) => ({
  a: line[0].split(',').reduce((acc, item, i) => {
    if (i == 0) return { ...acc, x: +item }
    return { ...acc, y: +item }
  }, {}),
  b: line[1].split(',').reduce((acc, item, i) => {
    if (i == 0) return { ...acc, x: +item }
    return { ...acc, y: +item }
  }, {})
}))
const dummyCoordinates = dummyInput.split('\n').map((i) => i.split(' -> ')).map((line) => ({
  a: line[0].split(',').reduce((acc, item, i) => {
    if (i == 0) return { ...acc, x: +item }
    return { ...acc, y: +item }
  }, {}),
  b: line[1].split(',').reduce((acc, item, i) => {
    if (i == 0) return { ...acc, x: +item }
    return { ...acc, y: +item }
  }, {})
}))
// console.log(`First Dummy Answer is ${firstSolution(dummyCoordinates)}`)
// console.log(`Second Dummy Answer is ${secondSolution(dummyCoordinates)}`)
console.log(`First Answer is ${firstSolution(coordinates)}`)
console.log(`Second Answer is ${secondSolution(coordinates)}`)
