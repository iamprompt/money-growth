export const getNumberWithThousandsSeparator = (
  number: string | number = '',
): string => {
  if (typeof number === 'number') {
    number = number.toString()
  }

  return number
    .replace(/[^0-9\.]/g, '') // Remove all characters except digits and dots
    .replace(/^0+/, '') // Remove leading zeros
    .replace(/^(\d{1,})\.(\d{2}).*$/, '$1.$2') // Keep only two decimal places
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',') // Add commas as thousands separators
}

export const numerizeDecimal = (number: string | number = 0): string => {
  if (typeof number === 'string') {
    number = parseFloat(number)
  }

  if (isNaN(Number(number)) || typeof number !== 'number') {
    number = 0
  }

  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export const numerize = (number: number = 0): string => {
  return number.toLocaleString()
}
