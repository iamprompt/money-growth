import { Fragment, useMemo } from 'react'

import { accountsMap, sortedOriginalAccounts } from '@/data/accounts'
import { banks } from '@/data/banks'

import { AccountAccordionItem, InterestStep } from './AccountAccordionItem'
import { AccountAccordionItemSkeleton } from './AccountAccordionItemSkeleton'

type InterestByAccount = {
  productCode: string
  steps: InterestStep[]
  interest: number
  amount: number
  average: number
  remaining: number
  bonus?: boolean
}

type AccountAccordionBundleProps = {
  sortedAccounts?: string[]
  interestByAccount?: InterestByAccount[]
  loading?: boolean
}

export const AccountAccordionBundle = ({
  sortedAccounts = [],
  interestByAccount = [],
  loading = false,
}: AccountAccordionBundleProps) => {
  const accounts = useMemo(() => {
    const interestAccounts = interestByAccount.map((interest) => {
      return [interest.productCode, interest] as [string, InterestByAccount]
    })

    return new Map(interestAccounts)
  }, [interestByAccount])

  if (loading) {
    return (
      <Fragment>
        {Array.from({ length: 5 }).map((_, index) => (
          <AccountAccordionItemSkeleton key={`accordion_skeleton_${index}`} />
        ))}
      </Fragment>
    )
  }

  if (sortedAccounts.length > 0 && interestByAccount.length > 0) {
    return (
      <Fragment>
        {sortedAccounts.map((product) => {
          const account = accountsMap.get(product)
          const interest = accounts.get(product)

          if (!interest || !account) {
            return null
          }

          return (
            <AccountAccordionItem
              key={`accordion_${account.code}`}
              account={account}
              bank={banks[account.bank]}
              summary={{
                amount: interest.amount,
                interest: interest.interest,
                average: interest.average,
              }}
              steps={interest.steps}
              isBonus={interest.bonus}
            />
          )
        })}
      </Fragment>
    )
  }

  return (
    <Fragment>
      {sortedOriginalAccounts.map((account) => {
        return (
          <AccountAccordionItem
            key={`accordion_${account.code}`}
            account={account}
            bank={banks[account.bank]}
            highestRate={account.highestRate}
            steps={account.interestRates.map((rate) => ({
              min: rate.min,
              max: rate.max,
              amount: 0,
              accumulatedAmount: 0,
              rate: rate.rate,
              interest: 0,
              accumulatedInterest: 0,
              averageRate: 0,
            }))}
            noResult
          />
        )
      })}
    </Fragment>
  )
}
