module.exports = (lanterns, days) => {
  const newLanternCounter = 8
  const oldLanternCounter = 6
  let prevNewLanterns = 0
  const proceed = (lan) => {
    let newLanternCount = 0
    for (let i = 0; i < lan.length; i++) {
      if (lan[i] > 0) { lan[i] -= 1 } else {
        lan[i] = oldLanternCounter
      }
      if (lan[i] == 0) { newLanternCount++ }
    }
    if (prevNewLanterns > 0) { lan.push(...Array(prevNewLanterns).fill(newLanternCounter)) }
    prevNewLanterns = newLanternCount

    return lan
  }

  for (let i = 0; i < days; i++) {
    proceed(lanterns)
    // console.log(`After ${i + 1} days:`, lanterns.join(','), prevNewLanterns)
  }
  return lanterns.length
}
