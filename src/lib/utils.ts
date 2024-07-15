import { round } from 'lodash'

export const roundValue = (value: number) => {
  return round(round(value, 3), 2)
}
