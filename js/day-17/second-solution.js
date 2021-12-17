module.exports = (rawStr) => {
  // after below commenetd code didn't work, I just brute forced my way here...
  const target = rawStr.substring(13).split(', ').map((c) => c.substring(2).split('..'))
  const [loX, hiX] = target[0].map((i) => +i)
  const [loY, hiY] = target[1].map((i) => +i)

  const inTargetArea = (x, y, loX, hiX, loY, hiY) => x >= loX && x <= hiX && y >= loY && y <= hiY
  const pastTargetArea = (y, ly) => y < ly
  const maxAbsY = Math.max(Math.abs(loY), Math.abs(hiY))

  let distinctVelocities = 0

  for (let x = 1; x <= hiX; ++x) {
    for (let y = maxAbsY; y >= -maxAbsY; --y) {
      let curX = 0
      let curY = 0
      let velX = x
      let velY = y

      while (!pastTargetArea(curY, loY)) {
        if (inTargetArea(curX, curY, loX, hiX, loY, hiY)) {
          ++distinctVelocities
          break
        }

        curX += velX
        curY += velY
        velX -= velX !== 0
        velY -= 1
      }

      if (curX < loX) break
    }
  }

  return distinctVelocities
}

// module.exports = (rawStr) => {
//   const target = rawStr.substring(13).split(', ').map((c) => c.substring(2).split('..'))

//   const [minX, maxX] = target[0].map((i) => +i)
//   const [maxY, minY] = target[1].map((i) => +i)

//   const horizontalPossibilities = []
//   const steps = {}
//   const calcSteps = (x) => {
//     let curV = x
//     let stepCount = 0
//     let curPos = 0
//     while (curV > 0 && curPos <= maxX) {
//       stepCount++
//       curPos += curV
//       if (curPos >= minX && curPos <= maxX) {
//         horizontalPossibilities.push([x, stepCount])
//         steps[stepCount] = []
//       }
//       curV--
//     }
//   }

//   const calcVerticalPossibilities = (step) => {
//     const verticalVs = []
//     for (let startV = 0; startV >= maxY; startV--) {
//       let curV = startV
//       let curPos = 0
//       let curStep = 0
//       while (step > curStep) {
//         curStep++
//         curPos += curV
//         curV--
//       }
//       if (curPos <= minY && curPos >= maxY) {
//         verticalVs.push(startV)
//         // steps[step].push(startV)
//       }
//     }

//     // shots to air
//     for (let startV = 1; true; startV++) {
//       let curV = startV
//       let curPos = 0
//       let curStep = 0
//       while (step > curStep) {
//         curStep++
//         curPos += curV
//         curV--
//       }
//       if (curPos <= minY && curPos >= maxY) {
//         verticalVs.push(startV)
//         // steps[step].push(startV)
//       } else if (curPos > minY) { break }
//     }

//     steps[step].push(...verticalVs)
//   }

//   for (let i = +maxX; i > 0; i--) {
//     calcSteps(i)
//   }

//   Object.keys(steps).map((k) => calcVerticalPossibilities(+k))
//   const distinctVelocities = {}
//   console.log('t', horizontalPossibilities, steps)
//   const total = horizontalPossibilities.reduce((acc, h) => {
//     steps[`${h[1]}`].map((v) => {
//       distinctVelocities[`${Math.min(h[0], -1 * v)},${Math.max(h[0], -1 * v)}`] = true
//     })

//     return acc + steps[`${h[1]}`].length
//   }, 0)
//   // console.log('distinctVelocities', distinctVelocities)
//   console.log('total', total)
//   return Object.keys(distinctVelocities).length
// }
