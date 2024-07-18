'use client'

import { useMutation } from '@tanstack/react-query'
import { useCallback, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { accountsList } from '@/data/accounts'

const Page = () => {
  const list = accountsList

  const { data, isPending, mutateAsync } = useMutation<
    any,
    Error,
    { amount: number }
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
      </div>
      <pre>
        {isPending ? 'Loading...' : data ? JSON.stringify(data, null, 2) : ''}
      </pre>
      {list.map((account) => (
        <div key={`account_${account.code}`}>
          <h2>{account.name}</h2>
          <p>{account.code}</p>
          <p>{account.bank}</p>
        </div>
      ))}
    </div>
  )
}

export default Page
