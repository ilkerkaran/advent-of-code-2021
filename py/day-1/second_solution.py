def secondSolution(inputArr):

  def addition(i):
    return int(i)
  arr = map(addition, inputArr)
  c=0
  for i, n in enumerate(arr):
       if (i>0 and i< (len(arr)-2)):
        #  print(i)
         if(arr[i + 2] > arr[i - 1]):
            c += 1 
  return c
