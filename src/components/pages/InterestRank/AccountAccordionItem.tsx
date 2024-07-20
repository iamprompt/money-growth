import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useMemo } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { DocumentType, InterestMethodMap } from '@/constants/accounts'
import { Account, Document } from '@/data/accounts'
import { Bank } from '@/data/banks'
import { numerize, numerizeDecimal } from '@/lib/number'
import { cn } from '@/lib/utils'

type AccountSummary = {
  interest: number
  amount: number
  average: number
}

export type InterestStep = {
  min: number
  max: number | null
  amount: number
  accumulatedAmount: number
  rate: number
  interest: number
  accumulatedInterest: number
  averageRate: number
}

type AccountAccordionItemProps = {
  account: Account
  bank: Bank
  highestRate?: number
  summary?: AccountSummary
  steps: InterestStep[]
  noResult?: boolean
  isBonus?: boolean
}

export const AccountAccordionItem = ({
  account,
  bank,
  summary,
  steps,
  noResult = false,
  highestRate,
  isBonus,
}: AccountAccordionItemProps) => {
  const hasBonusRate = useMemo(() => {
    return !!account.bonusInterestRates && account.bonusInterestRates.length > 0
  }, [account])

  const accountDocs = useMemo(() => {
    const { documents = [] } = account
    return documents.reduce(
      (acc, doc) => ({ ...acc, [doc.type]: doc }),
      {} as Record<DocumentType, Document>,
    )
  }, [account])

  const icon = useMemo(() => {
    if (account.icon && account.icon.path) {
      return account.icon
    }

    return bank.icon
  }, [bank, account])

  return (
    <AccordionItem
      key={`accordion_account_${account.code}`}
      className="border rounded-lg overflow-hidden"
      value={account.code}
    >
      <AccordionTrigger>
        <div className="flex justify-between flex-1 items-center">
          <div className="flex items-center gap-3">
            <div
              className="size-8 sm:size-10 rounded-md border shrink-0"
              style={{ backgroundColor: icon?.bgColor }}
            >
              {icon && (
                <Image
                  src={icon.path}
                  alt={bank.nameTh}
                  width={40}
                  height={40}
                />
              )}
            </div>
            <div>
              <div className="text-left text-sm sm:text-md block gap-2">
                {account.shortName || account.name}{' '}
                {(isBonus || hasBonusRate) && (
                  <span className="text-xs bg-yellow-200 text-yellow-800 px-1 rounded">
                    โบนัส
                  </span>
                )}{' '}
                {accountDocs[DocumentType.WEBSITE] && (
                  <Link
                    href={accountDocs[DocumentType.WEBSITE].url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-500 inline-block"
                  >
                    <FaExternalLinkAlt className="size-3" />
                  </Link>
                )}
              </div>
              <div className="text-left font-light text-[10px] sm:text-xs text-gray-400">
                {bank.nameTh}
              </div>
            </div>
          </div>
          {summary && (
            <div>
              <div className="text-right text-sm sm:text-md">
                ฿{numerizeDecimal(summary.amount)}
              </div>
              <div className="text-right font-light text-[10px] sm:text-xs text-gray-400">
                ฿{numerizeDecimal(summary.interest)} (
                {numerizeDecimal(summary.average)}% ต่อปี)
              </div>
            </div>
          )}
          {!summary && highestRate && (
            <div>
              <div className="text-right text-sm sm:text-md">
                {numerizeDecimal(highestRate)}%
              </div>
              <div className="text-right font-light text-[10px] sm:text-xs text-gray-400">
                อัตราดอกเบี้ยสูงสุด
              </div>
            </div>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="bg-gray-50 py-3 px-4 transition-all">
        <div className="space-y-4">
          <div>
            <div className="font-semibold mb-2">
              ขั้นบันไดดอกเบี้ย
              {InterestMethodMap[account.interestMethod]
                ? ` (${InterestMethodMap[account.interestMethod]})`
                : ''}
            </div>
            <div className="text-xs border rounded-lg w-full overflow-hidden overflow-x-scroll md:no-scrollbar">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b text-white bg-gray-800">
                    <th className="w-[200px]"></th>
                    {!noResult && (
                      <>
                        <th className="font-normal w-[100px] py-2">เงินฝาก</th>
                        <th className="font-normal w-[100px] py-2">
                          เงินฝากสะสม
                        </th>
                      </>
                    )}
                    <th className="font-normal w-[100px] py-2">
                      อัตราดอกเบี้ย
                    </th>
                    {!noResult && (
                      <>
                        <th className="font-normal w-[100px] py-2">ดอกเบี้ย</th>
                        <th className="font-normal w-[100px] py-2">
                          ดอกเบี้ยสะสม
                        </th>
                        <th className="font-normal w-[100px] py-2">
                          ดอกเบี้ยเฉลี่ย
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {steps.map((step, idx) => {
                    const isNoDeposit = step.amount === 0
                    return (
                      <tr
                        key={`accordion_account_${account.code}_steps_${idx}`}
                      >
                        <td className="font-light text-xs py-2 px-3">
                          {step.max === null || step.max === Infinity
                            ? `มากกว่า ${numerize(step.min)} บาท`
                            : `${numerize(step.min)} - ${numerize(step.max)} บาท`}
                        </td>
                        {!noResult && (
                          <>
                            <td
                              className={cn(
                                'font-light text-xs text-center px-2 py-2',
                                isNoDeposit && 'text-gray-400',
                              )}
                            >
                              {numerizeDecimal(step.amount)}
                            </td>
                            <td className="font-light text-xs text-center px-2 py-2">
                              {numerizeDecimal(step.accumulatedAmount)}
                            </td>
                          </>
                        )}
                        <td className="font-light text-xs text-center px-2 py-2">
                          {numerizeDecimal(step.rate)}%
                        </td>
                        {!noResult && (
                          <>
                            <td
                              className={cn(
                                'font-light text-xs text-center px-2 py-2',
                                isNoDeposit && 'text-gray-400',
                              )}
                            >
                              {numerizeDecimal(step.interest)}
                            </td>
                            <td className="font-light text-xs text-center px-2 py-2">
                              {numerizeDecimal(step.accumulatedInterest)}
                            </td>
                            <td className="font-light text-xs text-center px-2 py-2">
                              {numerizeDecimal(step.averageRate)}%
                            </td>
                          </>
                        )}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            {(isBonus || hasBonusRate) && (
              <div className="inline">
                <span className="font-semibold mb-2">เงื่อนไขโบนัส: </span>
                <span>{account.bonusConditions}</span>
              </div>
            )}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
