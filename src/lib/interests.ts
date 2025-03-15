import { InterestMethod } from '@/constants/accounts'
import { BreakBehavior } from '@/constants/interests'
import { accountsMap } from '@/data/accounts'
import { CalculatedInterestRate } from '@/types/interests'

import { mergeInterestRates } from './rates'
import { roundValue } from './utils'

type CalculateInterestByProductCodeOptions = {
  days?: number
  daysInYear?: number
  bonus?: boolean
  breakBehavior?: BreakBehavior
  breakRate?: number
}

export const calculateInterestByProductCode = (
  productCode: string,
  amount: number,
  {
    days = 365,
    daysInYear = 365,
    bonus,
    breakBehavior,
    breakRate,
  }: CalculateInterestByProductCodeOptions = {},
) => {
  const product = accountsMap.get(productCode)

  if (!product) {
    throw new Error(`Product with code ${productCode} not found`)
  }

  const { interestMethod } = product

  const rates = mergeInterestRates(productCode, bonus)

  const interests: CalculatedInterestRate[] = []

  let remainingAmount = amount
  let breakFlag = false

  const rateEntries = rates.entries()

  for (const [idx, rate] of rateEntries) {
    const {
      accumulatedAmount: prevAccumulatedAmount = 0,
      accumulatedInterest: prevAccumulatedInterest = 0,
      averageRate: prevAverageRate = 0,
    } = idx > 0 ? interests[idx - 1] : {}

    const { min, max, rate: interestRate } = rate

    const calculatedInterestRate: CalculatedInterestRate = {
      min,
      max,
      rate: interestRate,
      amount: 0,
      interest: 0,
      accumulatedInterest: 0,
      accumulatedAmount: 0,
      averageRate: 0,
    }

    let amount = 0

    const isSkip = remainingAmount <= 0 || breakFlag

    if (!isSkip) {
      if (interestMethod === InterestMethod.STEP_UP) {
        const availableAmount = Math.min(remainingAmount, max - min)
        amount = availableAmount
      } else if (interestMethod === InterestMethod.WHOLE) {
        if (breakBehavior === BreakBehavior.RATE_DROP) {
          const availableAmount = Math.min(remainingAmount, max)
          const highestRate = [...rates].sort((a, b) => b.rate - a.rate)[0]

          if (highestRate.rate === interestRate) {
            breakFlag = true
            amount = availableAmount
          }
        }

        if (remainingAmount <= max) {
          amount = remainingAmount
        }
      }
    }

    let roundedInterest = calculateInterestByAmount(amount, interestRate, {
      days,
      daysInYear,
    })

    let accumulatedAmount = prevAccumulatedAmount + amount
    let accumulatedInterest = prevAccumulatedInterest + roundedInterest
    let averageRate = getAverageRate(accumulatedInterest, accumulatedAmount)

    const isAverageRateDrop = prevAverageRate > averageRate

    if (breakBehavior === BreakBehavior.RATE_DROP && isAverageRateDrop) {
      breakFlag = true

      amount = 0
      roundedInterest = 0
      accumulatedAmount = prevAccumulatedAmount
      accumulatedInterest = prevAccumulatedInterest
      averageRate = prevAverageRate
    }

    if (
      interestMethod === InterestMethod.STEP_UP &&
      breakRate &&
      isAverageRateDrop &&
      averageRate < breakRate
    ) {
      breakFlag = true

      const newAmount = getExpectedAmountForTargetAverageRate(
        prevAccumulatedAmount,
        prevAccumulatedInterest,
        breakRate,
        interestRate,
      )

      amount = roundValue(newAmount)
      roundedInterest = calculateInterestByAmount(amount, interestRate, {
        days,
        daysInYear,
      })

      accumulatedAmount = prevAccumulatedAmount + amount
      accumulatedInterest = prevAccumulatedInterest + roundedInterest
      averageRate = getAverageRate(accumulatedInterest, accumulatedAmount)
    }

    calculatedInterestRate.amount = amount
    calculatedInterestRate.interest = roundedInterest
    calculatedInterestRate.accumulatedAmount = accumulatedAmount
    calculatedInterestRate.accumulatedInterest = accumulatedInterest
    calculatedInterestRate.averageRate = averageRate

    remainingAmount -= calculatedInterestRate.amount

    interests.push(calculatedInterestRate)
  }

  return {
    productCode: product.code,
    interests,
    amount: amount - remainingAmount,
    average: interests[interests.length - 1]?.averageRate || 0,
    remaining: remainingAmount,
  }
}

type CalculateInterestByAmountOptions = {
  days?: number
  daysInYear?: number
}

const calculateInterestByAmount = (
  amount: number,
  interestRate: number,
  { days = 365, daysInYear = 365 }: CalculateInterestByAmountOptions = {},
) => {
  const interestPerDay = (amount * (interestRate / 100)) / daysInYear
  return roundValue(interestPerDay * days)
}

const getExpectedAmountForTargetAverageRate = (
  accumulatedAmount: number,
  accumulatedInterest: number,
  targetAverageRate: number,
  interestRate: number,
) => {
  return (
    ((targetAverageRate / 100) * accumulatedAmount - accumulatedInterest) /
    (interestRate / 100 - targetAverageRate / 100)
  )
}

const getAverageRate = (
  accumulatedInterest: number,
  accumulatedAmount: number,
) => {
  return roundValue((accumulatedInterest / accumulatedAmount) * 100) || 0
}

type CalculateCombinedInterestOptions = {
  days?: number
  daysInYear?: number
  bonus?: Record<string, boolean> | boolean
  exclude?: string[]
  products?: string[]
}

type CalculatedAccount = {
  productCode: string
  interest: number
  steps: CalculatedInterestRate[]
  average: number
  remaining: number
  amount: number
  bonus?: boolean
}

export const calculateCombinedInterest = (
  amount: number,
  options: CalculateCombinedInterestOptions = {},
) => {
  const { days = 365, daysInYear = 365, bonus, exclude = [] } = options

  let products = options.products || []

  let sortedInterestAccounts: CalculatedAccount[] = []

  const interests: Record<string, CalculatedInterestRate[]> = {}
  const avgRates: Record<string, number> = {}
  const remainingMap: Record<string, number> = {}
  const computedAmountMap: Record<string, number> = {}

  if (amount <= 0) {
    return {
      avgRates,
      interests: sortedInterestAccounts,
    }
  }

  for (const [productCode] of accountsMap) {
    if (exclude.includes(productCode) || products.includes(productCode)) {
      continue
    }

    const {
      interests: computedInterests,
      remaining,
      average,
      amount: computedAmount,
    } = calculateInterestByProductCode(productCode, amount, {
      days,
      daysInYear,
      bonus: typeof bonus === 'boolean' ? bonus : bonus?.[productCode] || false,
      breakBehavior: BreakBehavior.RATE_DROP,
    })

    Object.assign(interests, { [productCode]: computedInterests })
    Object.assign(avgRates, { [productCode]: average })
    Object.assign(remainingMap, { [productCode]: remaining })
    Object.assign(computedAmountMap, { [productCode]: computedAmount })
  }

  const sortedAverageRate = Object.entries(avgRates).sort(
    ([, rateA], [, rateB]) => rateB - rateA,
  )

  const [highestRate, ...restRates] = sortedAverageRate

  if (highestRate) {
    const [highestProductCode, highestAvgRate] = highestRate || []
    products.push(highestProductCode)
    sortedInterestAccounts.push({
      productCode: highestProductCode,
      steps: interests[highestProductCode],
      average: highestAvgRate,
      interest: interests[highestProductCode].reduce(
        (acc, { interest }) => acc + interest,
        0,
      ),
      remaining: remainingMap[highestProductCode],
      amount: computedAmountMap[highestProductCode],
      bonus:
        typeof bonus === 'boolean'
          ? bonus
          : bonus?.[highestProductCode] || false,
    })

    const { interests: computedInterests } = calculateCombinedInterest(
      remainingMap[highestProductCode],
      { days, daysInYear, bonus, products, exclude },
    )

    sortedInterestAccounts.push(...computedInterests)
  }

  let totalInterest = 0
  let totalAmount = 0

  for (const { amount: computedAmount, interest } of sortedInterestAccounts) {
    totalAmount += computedAmount
    totalInterest += interest
  }

  let remaining = amount - totalAmount
  let interestAverage = roundValue((totalInterest / totalAmount) * 100)

  const [greaterRate] = restRates.filter(
    ([prodCode, rate]) =>
      rate > interestAverage && remainingMap[prodCode] === 0,
  )

  if (greaterRate) {
    const [prodCode] = greaterRate

    products = [prodCode]
    sortedInterestAccounts = [
      {
        productCode: prodCode,
        steps: interests[prodCode],
        average: avgRates[prodCode],
        interest: interests[prodCode].reduce(
          (acc, { interest }) => acc + interest,
          0,
        ),
        remaining: remainingMap[prodCode],
        amount: computedAmountMap[prodCode],
        bonus: typeof bonus === 'boolean' ? bonus : bonus?.[prodCode] || false,
      },
    ]
    totalAmount = computedAmountMap[prodCode]
    totalInterest = sortedInterestAccounts[0].interest
    remaining = 0
    interestAverage = avgRates[prodCode]
  }

  return {
    products,
    interests: sortedInterestAccounts,
    totalAmount,
    remaining,
    totalInterest,
    interestAverage,
  }
}
