export function dwnai(num) {
  if (typeof num === 'undefined' || num === null) {
    return '-'
  } if (isNaN(num)) {
    return '-'
  } if (num === 'Infinity' || !isFinite(num)) {
    return '-'
  }
  return parseFloat(num).toFixed(2) === '-0.00' ? '0.00' : parseFloat(num).toFixed(2)
}

export function ndwnai(num) {
  if (typeof num === 'undefined' || num === null) {
    return 0
  } if (isNaN(num)) {
    return 0
  } if (num === 'Infinity' || !isFinite(num)) {
    return 0
  }
  return parseFloat(num).toFixed(2) === '-0.00' ? '0.00' : parseFloat(num).toFixed(2)
}

// 用在曲线 保留null
export function dwnaiRetainNull(num) {
  if (typeof num === 'undefined' || num === null) {
    return null
  } if (isNaN(num)) {
    return null
  } if (num === 'Infinity' || !isFinite(num)) {
    return null
  }
  return parseFloat(num).toFixed(2) === '-0.00' ? '0.00' : parseFloat(num).toFixed(2)
}

export function decimalPlaces4(num) {
  if (typeof num === 'undefined' || num === null) {
    return '-'
  } if (isNaN(num)) {
    return '-'
  } if (num === 'Infinity' || !isFinite(num)) {
    return '-'
  }
  return parseFloat(num).toFixed(4) === '-0.0000' ? '0.0000' : parseFloat(num).toFixed(4)
}

export function ndecimalPlaces4(num) {
  if (typeof num === 'undefined' || num === null) {
    return 0
  } if (isNaN(num)) {
    return 0
  } if (num === 'Infinity' || !isFinite(num)) {
    return 0
  }
  return parseFloat(num).toFixed(4) === '-0.0000' ? '0.0000' : parseFloat(num).toFixed(4)
}
