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
const formatToInt = (parts, partTypeList) => Number.parseInt(joinParts(parts, partTypeList))

export const getNumericDates = (timeZone) => {
  const longFormatterOpts = { timeZone: timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }
  const longFormatter = new Intl.DateTimeFormat([], longFormatterOpts)

  const shortFormatterOpts = { timeZone: timeZone, year: '2-digit', month: '2-digit', day: '2-digit' }
  const shortFormatter = new Intl.DateTimeFormat([], shortFormatterOpts)

  const longParts = longFormatter.formatToParts(new Date())
  const shortParts = shortFormatter.formatToParts(new Date())

  return [
    { number: formatToInt(longParts, ['year', 'month', 'day']), id: 'iso' },
    { number: formatToInt(longParts, ['month', 'day', 'year']), id: 'us' },
    { number: formatToInt(longParts, ['day', 'month', 'year']), id: 'eu' },
    { number: formatToInt(shortParts, ['month', 'day', 'year']), id: 'us-short' },
    { number: formatToInt(shortParts, ['day', 'month', 'year']), id: 'eu-short' },
  ]
}
