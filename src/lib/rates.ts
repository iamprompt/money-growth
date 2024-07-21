import { accountsMap, InterestRate } from '@/data/accounts'

export const mergeInterestRates = (code: string, bonus: boolean = false) => {
  const account = accountsMap.get(code)

  if (!account) {
    throw new Error(`Account with code ${code} not found`)
  }

  const extractedInterestRates: InterestRate[] = []

  const { interestRates, bonusInterestRates = [] } = account

  for (const interestRate of interestRates) {
    console.log('RATE', interestRate)

    if (bonus) {
      // Bonus Rates that start within the range of the current rate
      const bonusRates = bonusInterestRates.filter(
        (rate) => interestRate.min <= rate.min || interestRate.min <= rate.max,
      )

      let globalMin = interestRate.min

      while (globalMin < interestRate.max) {
        let rate = interestRate.rate

        let min = globalMin
        let max = interestRate.max

        if (bonusRates.length > 0) {
          const bonusIdx = bonusRates.findIndex(
            (rate) => rate.min <= min || rate.max >= min,
          )
          const [bonusRate] = bonusRates.slice(bonusIdx, 1)

          if (bonusRate) {
            if (min < bonusRate.min) {
              max = bonusRate.min
            }

            if (max > bonusRate.max) {
              max = bonusRate.max
            }

            if (min >= bonusRate.min && max <= bonusRate.max) {
              rate += bonusRate.rate
              bonusRates.splice(bonusIdx, 1)
            }
          } else {
            min = interestRate.max
          }

          globalMin = max
        } else {
          globalMin = interestRate.max
        }

        if (min === max) {
          continue
        }

        extractedInterestRates.push({ rate, min, max })

        if (globalMin === Infinity) {
          break
        }
      }
    } else {
      extractedInterestRates.push(interestRate)
    }
  }

  return extractedInterestRates
}

export const getHighestRate = (rates: InterestRate[]) => {
  return rates.reduce((acc, rate) => {
    return rate.rate > acc ? rate.rate : acc
  }, -Infinity)
}
