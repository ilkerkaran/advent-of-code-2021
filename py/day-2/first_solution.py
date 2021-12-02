def solution(inputArr):
  h=0
  v=0
  for input in inputArr:
    c = input.split(' ')
    d = c[0]
    val = int(c[1])
    if (d == 'forward'):
      h += val
    elif(d == 'up'):
       v -= val
    elif(d == 'down'):
      v += val
  return h*v
