import { z } from 'zod'

import { calculateCombinedInterest } from '@/lib/interests'

const bodySchema = z.object({
  amount: z.number().min(0),
  accounts: z.array(
    z.object({
      productCode: z.string(),
      bonus: z.boolean().optional(),
      enable: z.boolean().default(true).optional(),
    }),
  ),
})

export const POST = async (request: Request) => {
  try {
    const { amount, accounts } = bodySchema.parse(await request.json())

    const interest = calculateCombinedInterest(amount, {
      bonus: accounts.reduce((acc, { productCode, bonus }) => {
        if (bonus === false) return { ...acc, [productCode]: false }
        return acc
      }, {}),
      exclude: accounts
        .filter(({ enable }) => !enable)
        .map(({ productCode }) => productCode),
    })

    return Response.json(interest)
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 })
  }
}
