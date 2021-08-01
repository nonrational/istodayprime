export const isPrime = (num) => {
  if (num <= 1) {
    return true
  } else if (num <= 3) {
    return true
  } else if (num % 2 === 0 || num % 3 === 0) {
    return false
  }

  let i = 5
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false
    }
    i += 6
  }
  return true
}

// get the value out of a type/value result from formatToParts
const val = (partObj, partType) => partObj.find((part) => part.type === partType).value
const joinParts = (parts, partTypeList) => partTypeList.map((partType) => val(parts, partType)).join('')

export const getLocalDateAsIntegers = (timeZone) => {
  const longFormatterOpts = { timeZone: timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }
  const longFormatter = new Intl.DateTimeFormat([], longFormatterOpts)

  const shortFormatterOpts = { timeZone: timeZone, year: '2-digit', month: '2-digit', day: '2-digit' }
  const shortFormatter = new Intl.DateTimeFormat([], shortFormatterOpts)

  const longParts = longFormatter.formatToParts(new Date())
  const shortParts = shortFormatter.formatToParts(new Date())

  return [
    joinParts(longParts, ['year', 'month', 'day']),
    joinParts(longParts, ['month', 'day', 'year']),
    joinParts(longParts, ['day', 'month', 'year']),
    joinParts(shortParts, ['month', 'day', 'year']),
    joinParts(shortParts, ['day', 'month', 'year']),
  ].map((str) => Number.parseInt(str))
}
