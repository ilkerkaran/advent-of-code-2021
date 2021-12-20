const r0 = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
]
const r1 = [
  [1, 0, 0],
  [0, 0, -1],
  [0, 1, 0]
]

const r2 = [
  [1, 0, 0],
  [0, -1, 0],
  [0, 0, -1]
]

const r3 = [
  [1, 0, 0],
  [0, 0, 1],
  [0, -1, 0]
]

const r4 = [
  [0, -1, 0],
  [1, 0, 0],
  [0, 0, 1]
]

const r5 = [
  [0, 0, 1],
  [1, 0, 0],
  [0, 1, 0]
]

const r6 = [
  [0, 1, 0],
  [1, 0, 0],
  [0, 0, -1]
]

const r7 = [
  [0, 0, -1],
  [1, 0, 0],
  [0, -1, 0]
]

const r8 = [
  [-1, 0, 0],
  [0, -1, 0],
  [0, 0, 1]
]

const r9 = [
  [-1, 0, 0],
  [0, 0, -1],
  [0, -1, 0]
]

const r10 = [
  [-1, 0, 0],
  [0, 1, 0],
  [0, 0, -1]
]

const r11 = [
  [-1, 0, 0],
  [0, 0, 1],
  [0, 1, 0]
]

const r12 = [
  [0, 1, 0],
  [-1, 0, 0],
  [0, 0, 1]
]

const r13 = [
  [0, 0, 1],
  [-1, 0, 0],
  [0, -1, 0]
]

const r14 = [
  [0, -1, 0],
  [-1, 0, 0],
  [0, 0, -1]
]

const r15 = [
  [0, 0, -1],
  [-1, 0, 0],
  [0, 1, 0]
]

const r16 = [
  [0, 0, -1],
  [0, 1, 0],
  [1, 0, 0]
]

const r17 = [
  [0, 1, 0],
  [0, 0, 1],
  [1, 0, 0]
]

const r18 = [
  [0, 0, 1],
  [0, -1, 0],
  [1, 0, 0]
]

const r19 = [
  [0, -1, 0],
  [0, 0, -1],
  [1, 0, 0]
]

const r20 = [
  [0, 0, -1],
  [0, -1, 0],
  [-1, 0, 0]
]

const r21 = [
  [0, -1, 0],
  [0, 0, 1],
  [-1, 0, 0]
]

const r22 = [
  [0, 0, 1],
  [0, 1, 0],
  [-1, 0, 0]
]
const r23 = [
  [0, 1, 0],
  [0, 0, -1],
  [-1, 0, 0]
]

const subCoor = (c1, c2) => [c1[0] - c2[0], c1[1] - c2[1], c1[2] - c2[2]]

const addCoor = (c1, c2) => [c1[0] + c2[0], c1[1] + c2[1], c1[2] + c2[2]]
const isSame = (c1, c2) => c1[0] == c2[0] && c1[1] == c2[1] && c1[2] == c2[2]
const toStr = (c) => `${c[0]},${c[1]},${c[2]}`
const util = require('util')

module.exports = (rawStr) => {
  const rotationMatrixArr = [
    r0,
    r1,
    r2,
    r3,
    r4,
    r5,
    r6,
    r7,
    r8,
    r9,
    r10,
    r11,
    r12,
    r13,
    r14,
    r15,
    r16,
    r17,
    r18,
    r19,
    r20,
    r21,
    r22,
    r23
  ]
  const inputArr = rawStr.split('\n\n')
  const scannerMap = []
  inputArr.map((sl, i) => {
    const [scannerName, ...scannedBeacons] = sl.split('\n')
    scannerMap[scannerName.split(' ')[2]] = {
      scannedBeacons: scannedBeacons.map((sbArr) =>
        sbArr.split(',').map((c) => +c)
      ),
      scannerNum: i
    }
  })
  const beacons = {}
  // assume scanner 0's location is 0,0,0
  scannerMap[0].coor = [0, 0, 0]
  scannerMap[0].scannedBeacons.map((c) => {
    beacons[`${c[0]},${c[1]},${c[2]}`] = true
  })
  const rotateCoor = (coor, rotationIndex) => {
    const rotatedCoor = []
    const rotationMatrix = rotationMatrixArr[rotationIndex]
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const m = rotationMatrix[i][j]
        if (m) rotatedCoor[i] = m * coor[j]
      }
    }
    return rotatedCoor
  }

  const rotateScanner = (scannerNum, rotationIndex) => {
    const rotatedScanner = scannerMap[scannerNum].scannedBeacons.map((sb) =>
      rotateCoor(sb, rotationIndex)
    )
    return rotatedScanner
  }

  const matchByCoor = (s1Loc, ep1, ep2) => {
    const x = addCoor(s1Loc, ep1)
    const possibleS2Loc = subCoor(x, ep2)
    return possibleS2Loc
  }

  const matchScanners = (s1, s2) => {
    const possibleS2LocMap = {}
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < s1.scannedBeacons.length; j++) {
        const s1EntryPoint = s1.scannedBeacons[j]
        const rotatedS2 = rotateScanner(s2.scannerNum, i)

        for (let k = 0; k < rotatedS2.length; k++) {
          const s2EntryPoint = rotatedS2[k]
          const possibleS2Loc = matchByCoor(s1.coor, s1EntryPoint, s2EntryPoint)
          possibleS2LocMap[toStr(possibleS2Loc)] =
            possibleS2LocMap[toStr(possibleS2Loc)] + 1 || 1
          if (possibleS2LocMap[toStr(possibleS2Loc)] >= 12) {
            scannerMap[s2.scannerNum].coor = possibleS2Loc
            scannerMap[s2.scannerNum].scannedBeacons = rotatedS2
            return true
          }
        }
      }
    }

    return false
  }

  const iterateMixedScanners = (certains, uncertaions) => {
    let match = 0
    for (let i = 0; i < certains.length; i++) {
      const s1 = certains[i]

      for (let j = 0; j < uncertaions.length; j++) {
        const s2 = uncertaions[j]
        const res = matchScanners(s1, s2)
        if (res) match++
      }
    }

    return match
  }

  let offset = 0
  while (offset < scannerMap.length - 1) {
    const certainScanners = scannerMap.filter((s) => s.coor).slice(offset)
    const uncertainScanners = scannerMap.filter((s) => !s.coor)
    offset += iterateMixedScanners(certainScanners, uncertainScanners)
  }

  // all scanned beacons are in the same domain now

  scannerMap.map((s) => {
    s.scannedBeacons.map((coor) => {
      const bCoor = addCoor(s.coor, coor)
      beacons[`${bCoor[0]},${bCoor[1]},${bCoor[2]}`] = true
    })
  })

  const beaconCount = Object.keys(beacons).length

  log('beacons', beaconCount)
  return beaconCount
}
const log = (...data) => {
  console.log(util.inspect(data, false, 10))
}
