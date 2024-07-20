'use client'

import { Accordion } from '@radix-ui/react-accordion'
import { Info } from 'lucide-react'
import Image from 'next/image'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { accounts, bonusAccountLists } from '@/data/accounts'
import { BankCode, banks } from '@/data/banks'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { numerizeDecimal } from '@/lib/number'
import { getHighestRate } from '@/lib/rates'
import { cn } from '@/lib/utils'

type AdvancedFilterFormProps = {
  className?: string
  onSubmit?: (data: Map<string, Account>) => Promise<void>
}

type AdvancedFilterFormRef = {
  submit: () => Promise<void>
}

type AdvancedFilterTriggerProps = {
  onSubmit?: () => void
}

export const AdvancedFilterTrigger = ({
  onSubmit,
}: AdvancedFilterTriggerProps) => {
  const { setValue } = useFormContext()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const onSubmitForm = async (data: Map<string, Account>) => {
    const preferences = [...data.values()]
    setValue('accounts', preferences)
    onSubmit?.()
  }

  if (isDesktop) {
    return <AdvancedFilterSheet onSubmit={onSubmitForm} />
  }

  return <AdvancedFilterDrawer onSubmit={onSubmitForm} />
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

const accountSchema = z.object({
  productCode: z.string(),
  bonus: z.boolean().optional(),
  enabled: z.boolean().default(true).optional(),
})

type Account = z.infer<typeof accountSchema>

const AdvancedFilterDrawer = ({
  className,
  onSubmit,
}: AdvancedFilterFormProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const filterFormRef = useRef<AdvancedFilterFormRef>(null)

  const handleSubmit = async () => {
    await filterFormRef.current?.submit()
    setIsOpen(false)
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <AdvancedFilterButton />
      </DrawerTrigger>
      <DrawerContent className="px-4 h-3/4 flex flex-col justify-between">
        <DrawerTitle className="sr-only">ตัวกรองขั้นสูง</DrawerTitle>
        <DrawerDescription className="sr-only">
          ตัวกรองขั้นสูง
        </DrawerDescription>
        <AdvancedFilterForm
          ref={filterFormRef}
          className="mt-6 mb-4 overflow-y-scroll"
          onSubmit={onSubmit}
        />
        <DrawerFooter className="pt-2 px-0">
          <Button onClick={handleSubmit}>ปรับใช้</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const AdvancedFilterSheet = ({
  className,
  onSubmit,
}: AdvancedFilterFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const filterFormRef = useRef<AdvancedFilterFormRef>(null)

  const handleSubmit = async () => {
    await filterFormRef.current?.submit()
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <AdvancedFilterButton />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetTitle className="sr-only">ตัวกรองขั้นสูง</SheetTitle>
        <SheetDescription className="sr-only">ตัวกรองขั้นสูง</SheetDescription>
        <AdvancedFilterForm
          ref={filterFormRef}
          className="overflow-y-scroll h-full flex-1"
          onSubmit={onSubmit}
        />
        <SheetFooter>
          <Button className="w-full" onClick={handleSubmit}>
            ปรับใช้
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

const AdvancedFilterForm = forwardRef<
  AdvancedFilterFormRef,
  AdvancedFilterFormProps
>(({ className, onSubmit }, ref) => {
  const [openPanels, setOpenPanels] = useState<string[]>([])

  const [accountPreferences, setAccountPreferences] = useState<
    Map<string, Account>
  >(new Map())

  const { getValues } = useFormContext()

  useImperativeHandle(ref, () => ({
    submit: async () => {
      await onSubmit?.(accountPreferences)
    },
  }))

  const accountPrefs = getValues('accounts')

  useEffect(() => {
    const preferences: Account[] = accountPrefs || []

    const preferencesMap = new Map<string, Account>()
    for (const pref of preferences) {
      preferencesMap.set(pref.productCode, pref)
    }

    setAccountPreferences(preferencesMap)
  }, [accountPrefs])

  return (
    <TooltipProvider>
      <div className={cn(className)}>
        <div>
          <div>
            <h3 className="text-lg font-semibold mb-4">
              บัญชีเงินฝากดอกเบี้ยสูง
            </h3>
          </div>
          <Accordion
            type="multiple"
            value={openPanels}
            onValueChange={setOpenPanels}
          >
            {Object.entries(accounts).map(([bankCode, accounts]) => {
              if (!accounts.length) return null

              const bank = banks[bankCode as BankCode]
              const isBankEnable = accounts.some(
                (account) =>
                  accountPreferences.get(account.code)?.enabled ?? true,
              )

              return (
                <AccordionItem
                  className="border-none"
                  key={`advanced_filter_${bankCode}`}
                  value={`advanced_filter_${bankCode}`}
                >
                  <AccordionTrigger className="p-2 flex gap-2 border-b">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          'size-6 rounded-full border shrink-0',
                          !isBankEnable && 'grayscale',
                        )}
                        style={{
                          backgroundColor: bank.icon?.bgColor,
                        }}
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
                      <div
                        className={cn(
                          'flex flex-col',
                          !isBankEnable && 'text-gray-500',
                        )}
                      >
                        <span className="font-medium">{bank.nameTh}</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-0">
                    {accounts.map((account) => {
                      const accountPref = accountPreferences.get(account.code)

                      return (
                        <div
                          key={account.code}
                          className="p-2 flex justify-between items-center"
                        >
                          <label
                            htmlFor={`account-switch-${account.code}`}
                            className={
                              (accountPref?.enabled ?? true)
                                ? 'text-primary'
                                : 'text-gray-500'
                            }
                          >
                            {account.shortName || account.name}{' '}
                            <span className="text-xs bg-yellow-200 text-yellow-800 px-1 rounded">
                              {numerizeDecimal(
                                getHighestRate(account.interestRates),
                              )}
                              %
                            </span>
                          </label>
                          <div>
                            <Switch
                              id={`account-switch-${account.code}`}
                              checked={accountPref?.enabled ?? true}
                              onCheckedChange={(checked) => {
                                if (!accountPref) {
                                  setAccountPreferences(
                                    new Map(
                                      accountPreferences.set(account.code, {
                                        productCode: account.code,
                                        enabled: checked,
                                      }),
                                    ),
                                  )
                                } else {
                                  setAccountPreferences(
                                    new Map(
                                      accountPreferences.set(account.code, {
                                        ...accountPref,
                                        enabled: checked,
                                      }),
                                    ),
                                  )
                                }
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
        <div className="mt-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">อัตราดอกเบี้ยโบนัส</h3>
          </div>
          <div>
            {bonusAccountLists.map((account) => {
              const accountPref = accountPreferences.get(account.code)

              return (
                <div
                  key={account.code}
                  className="py-2 flex justify-between items-center"
                >
                  <div className="align-center">
                    <label
                      htmlFor={`account-switch-${account.code}`}
                      className={
                        (accountPref?.bonus ?? false)
                          ? 'text-primary'
                          : 'text-gray-500'
                      }
                    >
                      {account.shortName || account.name}
                    </label>
                    {!!account.bonusConditions && (
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="ml-1 size-4" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-96">
                          {account.bonusConditions}
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                  <Switch
                    id={`account-switch-${account.code}`}
                    checked={accountPref?.bonus ?? false}
                    onCheckedChange={(checked) => {
                      if (!accountPref) {
                        setAccountPreferences(
                          new Map(
                            accountPreferences.set(account.code, {
                              productCode: account.code,
                              bonus: checked,
                              enabled: true,
                            }),
                          ),
                        )
                      } else {
                        setAccountPreferences(
                          new Map(
                            accountPreferences.set(account.code, {
                              ...accountPref,
                              bonus: checked,
                              enabled: true,
                            }),
                          ),
                        )
                      }
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
})

AdvancedFilterForm.displayName = 'AdvancedFilterForm'
