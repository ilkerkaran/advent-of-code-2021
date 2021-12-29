const part1 = require('./first-solution')

module.exports = (lines) =>
  part1(
    lines
      .slice(0, 3)
      .concat('  #D#C#B#A#  ', '  #D#B#A#C#  ')
      .concat(lines.slice(3))
  )
