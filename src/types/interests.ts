export type CalculatedInterestRate = {
  min: number
  max: number
  rate: number
  exclude?: boolean
  amount: number
  interest: number
  accumulatedInterest: number
  accumulatedAmount: number
  averageRate: number
}
