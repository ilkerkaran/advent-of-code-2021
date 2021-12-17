module.exports = (hx) => {
  const bn = hex2bin(hx)
  console.log('hx', hx)
  console.log('binary', bn, bn.length)
  const verSum = 0
  let ptr = 0
  const process = () => {
    const startPtr = ptr

    const verBits = bn.substr(ptr, 3)
    ptr += 3
    const typeBits = bn.substr(ptr, 3)
    ptr += 3
    const ver = parseInt(verBits, 2)

    const type = parseInt(typeBits, 2)
    const lengTypeBit = type == 4 ? -1 : bn.substr(ptr, 1)
    ptr = lengTypeBit == -1 ? ptr : ptr + 1

    const stack = []
    let res
    switch (lengTypeBit) {
      case '0':
        const numberOfSubBits = bn.substr(ptr, 15)
        const numberOfSub = parseInt(numberOfSubBits, 2)
        ptr += 15
        const startPtr = ptr
        let processedBits = 0

        while (numberOfSub > processedBits) {
          const [h, pbits, newPtr] = process()
          stack.push(h)
          ptr = newPtr
          processedBits += pbits
        }
        break
      case '1':
        const numberOfSubPacketBits = bn.substr(ptr, 11)
        const numberofSubPackets = parseInt(numberOfSubPacketBits, 2)
        ptr += 11
        let ctr = 0
        while (ctr < numberofSubPackets) {
          const [h,, newPtr] = process()
          stack.push(h)
          ptr = newPtr
          ctr++
        }
        break
      default:
        let cont = 0
        let nums = ''
        do {
          const piece = bn.substr(ptr, 5)
          cont = piece.substr(0, 1)
          nums += piece.substr(1, 4)
          ptr += 5
        } while (cont != '0')
        res = parseInt(nums, 2)
        break
    }

    switch (type) {
      case 0:
        res = stack.reduce((acc, i) => acc + i, 0)
        break
      case 1:
        res = stack.reduce((acc, i) => acc * i, 1)
        break
      case 2:
        res = Math.min(...stack)
        break
      case 3:
        res = Math.max(...stack)
        break
      case 5:
        res = stack[0] > stack[1]
        break
      case 6:
        res = stack[0] < stack[1]
        break
      case 7:
        res = stack[0] == stack[1]
        break
      default:
        break
    }

    return [res, ptr - startPtr, ptr]
  }

  const res = process()
  return res[0]
}

const hex2bin = (hex) => {
  const bin = hex.replace('0x', '').toLowerCase().split('').reduce((out, c) => {
    switch (c) {
      case '0': return `${out}0000`
      case '1': return `${out}0001`
      case '2': return `${out}0010`
      case '3': return `${out}0011`
      case '4': return `${out}0100`
      case '5': return `${out}0101`
      case '6': return `${out}0110`
      case '7': return `${out}0111`
      case '8': return `${out}1000`
      case '9': return `${out}1001`
      case 'a': return `${out}1010`
      case 'b': return `${out}1011`
      case 'c': return `${out}1100`
      case 'd': return `${out}1101`
      case 'e': return `${out}1110`
      case 'f': return `${out}1111`
      default: return out
    }
  }, '')
  return bin
}
