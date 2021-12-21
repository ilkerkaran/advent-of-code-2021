module.exports = (rawStr) => {
  const values = rawStr.split("\n").map((l) => +l.split(" ")[4])

  let dieVal = 0
  const scores = [0, 0]
  const roll = () => {
    dieVal++
    if (dieVal > 100) dieVal = 1
    return dieVal
  }
  const move = (start, val) => {
    let cur = start
    for (let i = 1; i <= val; i++) {
      if (cur + 1 > 10) cur = 1
      else cur++
    }
    return cur;
  }
  console.log("starting positions", values);
  let turn = 0;
  let rollCount = 0;
  while (scores[0] < 1000 && scores[1] < 1000) {
    const r1 = roll();
    const r2 = roll();
    const r3 = roll();
    rollCount += 3;
    const totalMove = r1 + r2 + r3;
    values[turn % 2] = move(values[turn % 2], totalMove);
    scores[turn % 2] += values[turn % 2]
    turn++;
  }

  const loser = Math.min(...scores)
  // console.log(scores, turn)
  return loser * rollCount;
}
