const input = require('./input')
const firstSolution = require('./first-solution')
const seondSolution = require('./second-solution')

const inputArr = input.split('\n')
console.log(`First Answer is ${firstSolution(inputArr)}`)

console.log(`Second Answer is ${seondSolution(inputArr)}`)
