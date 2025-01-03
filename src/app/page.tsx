'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { sendGTMEvent } from '@next/third-parties/google'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  AccountAccordionBundle,
  AdvancedFilterTrigger,
  InterestSummaryBox,
} from '@/components/pages/InterestRank'
import { DisclaimerCallout } from '@/components/pages/InterestRank/DisclaimerCallout'
import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { getNumberWithThousandsSeparator, numerizeDecimal } from '@/lib/number'
import {
  accountPreferencesSchema,
  getPreferences,
  setPreferences,
} from '@/lib/preferences'

const schema = z.object({
  amount: z
    .string()
    .transform((value) => {
      return parseFloat(value.replace(/,/g, ''))
    })
    .refine((value) => value > 0),
  accounts: z.array(accountPreferencesSchema),
})

type CalculateInterestResponse = {
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
    bonus?: boolean
  }[]
  interestAverage: number
  remaining: number
  totalAmount: number
  totalInterest: number
}

const Page = () => {
  const form = useForm<z.input<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: '',
      accounts: [],
    },
  })

  const isPreferencesLoaded = useRef(false)

  const { data, isPending, isSuccess, mutateAsync } = useMutation<
    CalculateInterestResponse,
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

  const formRef = useRef<HTMLFormElement>(null)

  const onManualSubmit = useCallback(() => {
    if (form.formState.isSubmitted) {
      formRef.current?.requestSubmit()
    }
  }, [formRef, form.formState.isSubmitted])

  useEffect(() => {
    if (data) {
      setOpenPanels(data.products)
    }
  }, [data])

  useEffect(() => {
    if (isPreferencesLoaded.current) {
      return
    }

    console.log('Fetching preferences')
    const preferences = getPreferences()
    console.log('Preferences fetched')

    form.setValue('accounts', preferences.accounts)
    console.log('Preferences loaded')
    isPreferencesLoaded.current = true
  }, [form])

  const handleSubmit = useCallback(
    async (data: z.input<typeof schema>) => {
      form.setValue('amount', numerizeDecimal(data.amount))
      sendGTMEvent({ event: 'calculate_interest' })
      await mutateAsync({ ...data, amount: parseFloat(data.amount) })
      console.log('Result fetched successfully')

      setPreferences({ accounts: data.accounts })
      console.log('Preferences saved')
    },
    [mutateAsync, form],
  )

  return (
    <div>
      <div className="max-w-screen-lg mx-auto px-4 py-6">
        <div>
          <div className="text-2xl font-bold text-center">Money Growth</div>
          <div className="text-xl text-center text-gray-600 mt-2">
            ปล่อยให้เงินทำงานด้วยดอกเบี้ยเงินฝากที่ดีที่สุด
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <div className="space-y-2">
            <div>
              <Form {...form}>
                <form
                  ref={formRef}
                  className="flex flex-col sm:flex-row sm:items-end gap-4 w-full"
                  onSubmit={form.handleSubmit(handleSubmit, console.log)}
                >
                  <FormField
                    name="amount"
                    control={form.control}
                    render={({ field: { onChange, ...field } }) => {
                      return (
                        <FormItem className="w-full">
                          <FormLabel>จำนวนเงินฝาก (บาท)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              inputMode="decimal"
                              onChange={(e) => {
                                const { value } = e.target
                                onChange(getNumberWithThousandsSeparator(value))
                              }}
                              placeholder="1,000,000.00"
                            />
                          </FormControl>
                        </FormItem>
                      )
                    }}
                  />

                  <div className="flex gap-4 w-full sm:w-auto">
                    <Button className="w-full" type="submit">
                      คำนวณ
                    </Button>
                    <AdvancedFilterTrigger onSubmit={onManualSubmit} />
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <div className="mb-6">
            <div className="text-2xl font-semibold">
              บัญชีเงินฝากออมทรัพย์ดอกเบี้ยสูง
            </div>
            {isPending && <Skeleton className="h-5 w-64 mt-3 mb-1" />}
            {data && (
              <div className="text-xl font-semibold text-gray-800 mt-2">
                เงินฝากทั้งหมด{' '}
                {numerizeDecimal(data.totalAmount + data.remaining)} บาท
              </div>
            )}
          </div>

          <DisclaimerCallout />

          <Accordion
            className="space-y-4"
            type="multiple"
            value={openPanels}
            onValueChange={setOpenPanels}
          >
            <AccountAccordionBundle
              sortedAccounts={data?.products}
              interestByAccount={data?.interests}
              loading={isPending}
              showResult={isSuccess}
            />
          </Accordion>

          {data && (
            <InterestSummaryBox
              amount={data.totalAmount}
              remaining={data.remaining}
              averageInterest={data.interestAverage}
              totalInterest={data.totalInterest}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
