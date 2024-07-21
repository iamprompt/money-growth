import { bankChannels, BankCode } from '@/data/banks'

export const getBankChannel = (bankCode: BankCode, channelKey: string) => {
  const channels = bankChannels[bankCode] || {}
  return channels[channelKey]
}
