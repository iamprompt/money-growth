import { ExternalLink, FileTextIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useMemo } from 'react'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DocumentType, InterestMethodMap } from '@/constants/accounts'
import { Channel } from '@/constants/banks'
import { Account, Document } from '@/data/accounts'
import { Bank } from '@/data/banks'
import { getBankChannel } from '@/lib/banks'
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

  console.log('account', account)
  console.log('bank', bank)

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
                  <span
                    className={cn(
                      'text-xs bg-yellow-200 text-yellow-800 px-1 rounded',
                      !isBonus && 'bg-gray-200 text-gray-800',
                    )}
                  >
                    โบนัส
                  </span>
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
            <span className="font-semibold mb-2">สถานะ: </span>
            <span
              className={cn(
                'text-xs px-1 rounded font-normal',
                account.openAccountStatus === false
                  ? 'bg-red-200 text-red-800'
                  : 'bg-green-200 text-green-800',
              )}
            >
              {account.openAccountStatus === false
                ? 'หมดระยะเวลาการเปิดบัญชี'
                : 'เปิดบัญชีได้'}
            </span>
          </div>
          <div>
            <div className="font-semibold mb-2 flex items-center">
              <div className="mr-1">
                ขั้นบันไดดอกเบี้ย
                {InterestMethodMap[account.interestMethod]
                  ? ` (${InterestMethodMap[account.interestMethod]})`
                  : ''}
              </div>
              <div className="flex items-center gap-1">
                {accountDocs[DocumentType.WEBSITE] && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        href={accountDocs[DocumentType.WEBSITE].url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-500 inline-block"
                      >
                        <ExternalLink className="size-3.5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-96">
                      เว็บไซต์
                    </TooltipContent>
                  </Tooltip>
                )}
                {accountDocs[DocumentType.SALES_SHEET] && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        href={accountDocs[DocumentType.SALES_SHEET].url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-500 inline-block"
                      >
                        <FileTextIcon className="size-3.5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-96">
                      ตารางเปิดเผยข้อมูลผลิตภัณฑ์
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
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
          {(isBonus || hasBonusRate) && (
            <div>
              <span className="font-semibold mb-2">เงื่อนไขโบนัส: </span>
              <span>{account.bonusConditions}</span>
            </div>
          )}
          {!!account.openAccountChannels?.length && (
            <div>
              <span className="font-semibold">ช่องทางการเปิดบัญชี: </span>
              <span className="inline-flex gap-1">
                {account.openAccountChannels.map((channel) => {
                  const key = `${channel.type}:${channel.key || 'default'}`
                  const channelDetail = getBankChannel(account.bank!, key)

                  const defaultChannelName = (() => {
                    switch (channel.type) {
                      case Channel.BRANCH:
                        return 'สาขา'
                      case Channel.CALL_CENTER:
                        return 'Call Center'
                      case Channel.APP:
                        return 'แอปพลิเคชัน'
                      case Channel.INTERNET_BANKING:
                        return 'อินเทอร์เน็ตแบงก์กิ้ง'
                    }
                  })()

                  if (!channelDetail) {
                    return null
                  }

                  return (
                    <Link
                      key={key}
                      href={channelDetail.uri || '#'}
                      target="_blank"
                      className={cn(
                        'inline-flex items-center gap-1 rounded px-1 bg-gray-200 text-gray-800 text-xs',
                        channelDetail.uri
                          ? 'hover:bg-gray-300'
                          : 'cursor-not-allowed',
                        channel.type === Channel.APP &&
                          'bg-blue-200 text-blue-800 hover:bg-blue-300',
                        channel.type === Channel.BRANCH &&
                          'bg-orange-200 text-orange-800 hover:bg-orange-300',
                      )}
                    >
                      {channelDetail.name || defaultChannelName}
                    </Link>
                  )
                })}
              </span>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
