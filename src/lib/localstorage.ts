export enum LocalStorageKey {
  PREFERENCES = 'preferences',
}

export const getLocalStorage = <T>(key: LocalStorageKey): T | null => {
  const item = localStorage.getItem(key)

  try {
    return item ? JSON.parse(item) : null
  } catch (error) {
    return item as unknown as T
  }
}

export const setLocalStorage = <T>(key: LocalStorageKey, value: T): void => {
  let data = ''

  try {
    data = JSON.stringify(value)
  } catch (error) {
    data = value as unknown as string
  }

  localStorage.setItem(key, data)
}

export const removeLocalStorage = (key: LocalStorageKey): void => {
  localStorage.removeItem(key)
}

export const clearLocalStorage = (): void => {
  localStorage.clear()
}
