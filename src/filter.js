import {toByteArray, fromByteArray} from 'base64-js'

export const base64 = {
  read: function (val) {
    return toByteArray(val)
  },
  write: function (val, oldVal) {
    return fromByteArray(val)
  }
}

export function bytesToHex (val) {
  var str = ''
  for (var i = 0; i < val.length; i++) {
    str += val[i].toString(16)
  }
  return str
}

export function unixToDate (val) {
  var date = new Date(val)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = date.getDate() + ' '
  let h = date.getHours() + ':'
  let m = date.getMinutes() + ':'
  let s = date.getSeconds()
  return Y + M + D + h + m + s
}

export function showHash (val) {
  if (val === undefined || val.length === 0) {
    return ''
  }
  val = toByteArray(val)
  var str = ''
  for (var i = 0; i < val.length; i++) {
    str += val[i].toString(16)
  }
  return str
}

export function reverse (arr) {
  if (arr.length <= 1) {
    return arr
  }
  let ret = []
  for (var i = 0; i < arr.length; i++) {
    ret[arr.length - 1 - i] = arr[i]
  }
  return ret
}
