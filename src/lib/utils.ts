import { type ClassValue, clsx } from 'clsx'
import { round } from 'lodash'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const roundValue = (value: number) => {
  return round(round(value, 3), 2)
}
