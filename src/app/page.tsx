'use client'

import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { accountsList, accountsMap } from '@/data/accounts'
import { banks } from '@/data/banks'
import { cn } from '@/lib/utils'

const Page = () => {
  const list = accountsList

  const { data, isPending, mutateAsync } = useMutation<
    {
      products: string[]
      interests: {
        productCode: string
        steps: {
          min: number
          max: number
          rate: number
          amount: number
          interest: number
          accumulatedInterest: number
          accumulatedAmount: number
          averageRate: number
        }[]
        interest: number
        average: number
        remaining: number
        amount: number
      }[]
      interestAverage: number
      remaining: number
      totalAmount: number
      totalInterest: number
    },
    Error,
    { amount: number; bonus?: boolean }
  >({
    mutationFn: async (body) => {
      const response = await fetch('/api/interests/calculate', {
        method: 'POST',
        body: JSON.stringify(body),
      })

      const data = await response.json()

      return data
    },
  })

  const [openPanels, setOpenPanels] = useState<string[]>([])

  const interestAccounts = useMemo(() => {
    return new Map(
      data?.interests.map((interest) => [interest.productCode, interest]) ?? [],
    )
  }, [data])

  useEffect(() => {
    if (data) {
      setOpenPanels(data.products)
    }
  }, [data])

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = useCallback(() => {
    console.log(inputRef.current?.value)
    mutateAsync({ amount: Number(inputRef.current?.value) })
  }, [mutateAsync])

  return (
    <div>
      <div className="max-w-screen-lg mx-auto px-4 py-6">
        <div className="text-2xl font-bold text-center">
          มีเงินฝากที่ไหน ดอกเบี้ยสูง?
        </div>

        <div className="space-y-2 mt-6">
          <div className="space-y-2">
            <div>จำนวนเงินฝาก (บาท)</div>
            <div className="flex gap-4">
              <Input ref={inputRef} placeholder="1000000" />
              <Button onClick={handleSubmit}>คำนวณ</Button>
            </div>
          </div>
        </div>
        {data && (
          <div className="mt-10">
            <div className="mb-6">
              <div className="text-2xl font-semibold">
                ฝากเงินใน {data?.products.length} บัญชี
              </div>
            </div>
            <Accordion
              className="space-y-4"
              type="multiple"
              value={openPanels}
              onValueChange={setOpenPanels}
            >
              {data?.products.map((product) => {
                const account = accountsMap.get(product)
                const interest = interestAccounts.get(product)

                if (!account || !interest) {
                  return null
                }

                const bank = banks[account.bank]

                return (
                  <AccordionItem
                    key={`account_${account.code}`}
                    className="border rounded-lg overflow-hidden"
                    value={account.code}
                  >
                    <AccordionTrigger className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div
                          className="size-10 rounded-md border shrink-0"
                          style={{ backgroundColor: bank.icon?.bgColor }}
                        >
                          {bank.icon && (
                            <Image
                              src={bank.icon.path}
                              alt={banks[account.bank].nameTh}
                              width={40}
                              height={40}
                            />
                          )}
                        </div>
                        <div>
                          <div className="text-left text-md">
                            {account.shortName || account.name}
                          </div>
                          <div className="text-left font-light text-xs text-gray-400">
                            {banks[account.bank].nameTh}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-right text-md">
                          ฿
                          {interest.amount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </div>
                        <div className="text-right font-light text-xs text-gray-400">
                          ดอกเบี้ยเฉลี่ย {interest.average.toFixed(2)}% ต่อปี (
                          {interest.interest.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}{' '}
                          บาท)
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-gray-50 py-3 px-4 transition-all">
                      <div>
                        <div className="font-medium">
                          ขั้นบันไดดอกเบี้ย (
                          {account.interestMethod === 'WHOLE'
                            ? 'ดอกเบี้ยทั้งก้อน'
                            : 'ดอกเบี้ยขั้นบันได'}
                          )
                        </div>
                        <div className="text-xs mt-2 border rounded-lg w-full overflow-hidden overflow-x-scroll md:no-scrollbar">
                          <table className="w-full table-fixed">
                            <thead>
                              <tr className="border-b text-white bg-gray-800">
                                <th className="w-[200px]"></th>
                                <th className="font-normal w-[100px] py-2">
                                  เงินฝาก
                                </th>
                                <th className="font-normal w-[100px] py-2">
                                  เงินฝากสะสม
                                </th>
                                <th className="font-normal w-[100px] py-2">
                                  อัตราดอกเบี้ย
                                </th>
                                <th className="font-normal w-[100px] py-2">
                                  ดอกเบี้ย
                                </th>
                                <th className="font-normal w-[100px] py-2">
                                  ดอกเบี้ยสะสม
                                </th>
                                <th className="font-normal w-[100px] py-2">
                                  ดอกเบี้ยเฉลี่ย
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {interest.steps.map((step) => {
                                const isNoDeposit = step.amount === 0
                                return (
                                  <tr key={step.min}>
                                    <td className="font-light text-xs py-2 px-3">
                                      {step.max === null
                                        ? `มากกว่า ${step.min.toLocaleString()} บาท`
                                        : `${step.min.toLocaleString()} - ${step.max.toLocaleString()} บาท`}
                                    </td>
                                    <td
                                      className={cn(
                                        'font-light text-xs text-center px-2 py-2',
                                        isNoDeposit && 'text-gray-400',
                                      )}
                                    >
                                      {step.amount.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                      })}
                                    </td>
                                    <td className="font-light text-xs text-center px-2 py-2">
                                      {step.accumulatedAmount.toLocaleString(
                                        undefined,
                                        { minimumFractionDigits: 2 },
                                      )}
                                    </td>
                                    <td className="font-light text-xs text-center px-2 py-2">
                                      {step.rate.toFixed(2)}%
                                    </td>
                                    <td
                                      className={cn(
                                        'font-light text-xs text-center px-2 py-2',
                                        isNoDeposit && 'text-gray-400',
                                      )}
                                    >
                                      {step.interest.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                      })}
                                    </td>
                                    <td className="font-light text-xs text-center px-2 py-2">
                                      {step.accumulatedInterest.toLocaleString(
                                        undefined,
                                        { minimumFractionDigits: 2 },
                                      )}
                                    </td>
                                    <td className="font-light text-xs text-center px-2 py-2">
                                      {step.averageRate.toFixed(2)}%
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div></div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg my-4">
              <div>
                <div className="text-xl font-light">
                  รวมเงินฝาก{' '}
                  <span className="font-semibold">
                    {data?.totalAmount.toLocaleString()}
                  </span>{' '}
                  บาท
                  {(data?.remaining || 0) > 0 && (
                    <span className="text-gray-400">{` (เหลือ ${data?.remaining.toLocaleString()} บาท)`}</span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-xl font-semibold text-right">
                  ดอกเบี้ยเฉลี่ย {data?.interestAverage.toFixed(2)}% ต่อปี
                </div>
                <div className="text-md font-light text-gray-400 text-right">
                  จะได้รับดอกเบี้ยประมาณ{' '}
                  {data?.totalInterest.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}{' '}
                  บาท
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
