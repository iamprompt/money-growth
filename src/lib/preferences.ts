import { z } from 'zod'

import {
  getLocalStorage,
  LocalStorageKey,
  setLocalStorage,
} from './localstorage'

export const accountPreferencesSchema = z.object({
  productCode: z.string(),
  bonus: z.boolean().optional(),
  enabled: z.boolean().default(true).optional(),
})

export const preferencesSchema = z.object({
  accounts: z.array(accountPreferencesSchema),
})

type Preferences = z.infer<typeof preferencesSchema>

const defaultPreferences: Preferences = {
  accounts: [],
}

export const getPreferences = (): Preferences => {
  return (
    getLocalStorage<Preferences>(LocalStorageKey.PREFERENCES) ||
    defaultPreferences
  )
}

export const setPreferences = ({
  accounts = [],
}: Partial<Preferences>): void => {
  const prev = getPreferences() || defaultPreferences

  // Remove accounts that are existing in the new preferences
  const existingAccounts = prev.accounts.filter((prevAccount) => {
    return !accounts.some(
      (account) => account.productCode === prevAccount.productCode,
    )
  })

  setLocalStorage(LocalStorageKey.PREFERENCES, {
    ...prev,
    accounts: [...existingAccounts, ...accounts],
  })
}
