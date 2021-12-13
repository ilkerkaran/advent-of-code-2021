const input = require('./input')
const dummyInput = require('./dummyInput')
const firstSolution = require('./first-solution')
const secondSolution = require('./second-solution')

const [paper, instructions] = input.split('\n\n')

const [dummyPaper, dummyInstructions] = dummyInput.split('\n\n')
// console.log(`First Dummy Answer is ${firstSolution(dummyPaper, dummyInstructions)}`)
// console.log(`Second Dummy Answer is ${secondSolution(dummyPaper, dummyInstructions)}`)
// console.log(`First Answer is ${firstSolution(paper, instructions)}`)
console.log(`Second Answer is ${secondSolution(paper, instructions)}`)
