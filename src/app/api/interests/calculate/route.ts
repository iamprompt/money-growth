import { z } from 'zod'

import { calculateCombinedInterest } from '@/lib/interests'

const bodySchema = z.object({
  amount: z.number().min(0),
  bonus: z
    .boolean()
    .or(
      z.array(
        z.object({
          productCode: z.string(),
          bonus: z.boolean(),
        }),
      ),
    )
    .default(false),
  exclude: z.array(z.string()).default([]),
})

export const POST = async (request: Request) => {
  try {
    const { amount, bonus, exclude } = bodySchema.parse(await request.json())

    const interest = calculateCombinedInterest(amount, {
      bonus:
        typeof bonus === 'boolean'
          ? bonus
          : bonus.reduce(
              (acc, { productCode, bonus }) => {
                return { ...acc, [productCode]: bonus }
              },
              {} as Record<string, boolean>,
            ),
      exclude,
    })

    return Response.json(interest)
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 })
  }
}
