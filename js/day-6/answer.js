const input = require('./input')
const dummyInput = require('./dummyInput')
const firstSolution = require('./first-solution')
const secondSolution = require('./second-solution')

const initialState = input.split(',').map((i) => +i)
const dummyInitialState = dummyInput.split(',').map((i) => +i)
console.log(`First Dummy Answer is ${firstSolution(dummyInitialState, 80)}`)
console.log(`Second Dummy Answer is ${secondSolution(dummyInitialState, 80)}`)
console.log(`First Answer is ${firstSolution(initialState, 80)}`)
console.log(`Second Answer is ${secondSolution(initialState, 256)}`)
