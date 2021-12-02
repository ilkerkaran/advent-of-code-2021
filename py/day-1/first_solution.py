def firstSolution(inputArr):

  def addition(i):
    return int(i)
  arr = map(addition, inputArr)
  c=0
  for i, n in enumerate(arr):
       if (arr[i] > arr[i - 1]):
          c += 1 
  return c
