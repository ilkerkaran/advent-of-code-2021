def solution(inputArr):
  h=0
  v=0
  angle=0
  for input in inputArr:
    c = input.split(' ')
    d = c[0]
    val = int(c[1])
    if (d == 'forward'):
      h += val
      v += (val * angle)
    elif(d == 'up'):
      angle -= val
    elif(d == 'down'):
      angle += val
  return h*v
