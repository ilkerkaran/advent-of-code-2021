module.exports = (lanterns, days) => {
  const newLanternCounter = 8
  const oldLanternCounter = 6
  let prevNewLanterns = 0
  let newLanterns = 0
  let dayOldlanterns = 0
  const lanternMap = {}
  for (let i = 0; i < lanterns.length; i++) {
    const lantern = lanterns[i]
    lanternMap[lantern] = (lanternMap[lantern] || 0) + 1
  }

  const proceed = (lan, day) => {
    const cycle = day % 7
    const newLanternCount = lanternMap[cycle] || 0
    const mapKey = cycle > 0 ? cycle - 1 : 6
    lanternMap[mapKey] = (lanternMap[mapKey] || 0) + dayOldlanterns
    dayOldlanterns = newLanterns
    newLanterns = prevNewLanterns
    prevNewLanterns = newLanternCount
  }

  for (let i = 0; i < days; i++) {
    proceed(lanterns, i + 1)
  }
  return Object.values(lanternMap).reduce((acc, i) => acc + i, 0) + newLanterns + dayOldlanterns
}
