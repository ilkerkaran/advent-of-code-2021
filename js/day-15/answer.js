const input = require('./input')
const dummyInput = require('./dummyInput')
const firstSolution = require('./first-solution')
const secondSolution = require('./second-solution')

const initialState = input.split('\n').map((l) => l.split('').map((i) => +i))

const dummyInitialState = dummyInput.split('\n').map((l) => l.split('').map((i) => +i))
// console.log(`First Dummy Answer is ${firstSolution(dummyInitialState)}`)
// console.log(`Second Dummy Answer is ${secondSolution(dummyInitialState)}`)
// console.log(`First Answer is ${firstSolution(initialState)}`)
console.log(`Second Answer is ${secondSolution(initialState)}`)
