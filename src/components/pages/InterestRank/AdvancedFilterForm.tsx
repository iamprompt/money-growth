'use client'

import { Accordion } from '@radix-ui/react-accordion'
import { useMediaQuery } from '@uidotdev/usehooks'
import Image from 'next/image'
import { forwardRef, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import { accounts } from '@/data/accounts'
import { BankCode, banks } from '@/data/banks'
import { cn } from '@/lib/utils'

type AdvancedFilterFormProps = {
  className?: string
}

export const AdvancedFilterTrigger = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return <AdvancedFilterSheet />
  }

  return <AdvancedFilterDrawer />
}

const AdvancedFilterButton = forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>((props, ref) => (
  <Button
    ref={ref}
    className="w-full"
    type="button"
    variant="secondary"
    {...props}
  >
    ขั้นสูง
  </Button>
))

AdvancedFilterButton.displayName = 'AdvancedFilterButton'

const AdvancedFilterDrawer = ({ className }: AdvancedFilterFormProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <AdvancedFilterButton />
      </DrawerTrigger>
      <DrawerContent className="px-4 h-3/4">
        <AdvancedFilterForm className="mt-6 mb-4 overflow-y-scroll" />
      </DrawerContent>
    </Drawer>
  )
}

const AdvancedFilterSheet = ({ className }: AdvancedFilterFormProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <AdvancedFilterButton />
      </SheetTrigger>
      <SheetContent>
        <AdvancedFilterForm />
      </SheetContent>
    </Sheet>
  )
}

const AdvancedFilterForm = ({ className }: AdvancedFilterFormProps) => {
  const { setValue, watch } = useFormContext()

  const [openPanels, setOpenPanels] = useState<string[]>([])

  const accountsWatch = watch('accounts')
  const accountsPreference = useMemo<
    { productCode: string; bonus?: boolean; enable?: boolean }[]
  >(() => {
    if (!accountsWatch) return []
    return accountsWatch
  }, [accountsWatch])

  return (
    <div className={cn(className)}>
      <div>
        <h3 className="text-lg font-semibold mb-4">บัญชีเงินฝากดอกเบี้ยสูง</h3>
      </div>
      <Accordion
        className="space-y-4"
        type="multiple"
        value={openPanels}
        onValueChange={setOpenPanels}
      >
        {Object.entries(accounts).map(([bankCode, accounts]) => {
          if (!accounts.length) return null

          const bank = banks[bankCode as BankCode]

          return (
            <AccordionItem
              className="border-none"
              key={`advanced_filter_${bankCode}`}
              value={`advanced_filter_${bankCode}`}
            >
              <AccordionTrigger className="p-2 flex gap-2 border-b">
                <div className="flex items-center gap-2">
                  <div
                    className="size-6 rounded-full border shrink-0"
                    style={{ backgroundColor: bank.icon?.bgColor }}
                  >
                    {bank.icon && (
                      <Image
                        src={bank.icon.path}
                        alt={bank.nameTh}
                        width={40}
                        height={40}
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{bank.nameTh}</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                {accounts.map((account) => {
                  const accountPrefIdx = accountsPreference.findIndex(
                    (a) => a.productCode === account.code,
                  )
                  const accountPref = accountsPreference[accountPrefIdx]

                  return (
                    <div
                      key={account.id}
                      className="p-2 flex justify-between items-center"
                    >
                      <div>{account.shortName || account.name}</div>
                      <div>
                        <Switch
                          checked={accountPref?.enable ?? true}
                          onCheckedChange={(checked) => {
                            console.log('checked', checked)

                            if (accountPrefIdx === -1) {
                              setValue('accounts', [
                                ...accountsPreference,
                                { productCode: account.code, enable: checked },
                              ])
                              return
                            }

                            setValue(
                              `accounts.${accountPrefIdx}.enable`,
                              checked,
                            )
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
