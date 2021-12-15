const input = require('./input')
const dummyInput = require('./dummyInput')
const firstSolution = require('./first-solution')
const secondSolution = require('./second-solution')

const [str, instructions] = input.split('\n\n')

const [dummyStr, dummyInstructions] = dummyInput.split('\n\n')
console.log(`First Dummy Answer is ${firstSolution(dummyStr, dummyInstructions, 10)}`)
console.log(`Second Dummy Answer is ${secondSolution(dummyStr, dummyInstructions, 40)}`)
console.log(`First Answer is ${firstSolution(str, instructions, 10)}`)
console.log(`Second Answer is ${secondSolution(str, instructions, 40)}`)
