'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Script from 'next/script'
import { ReactNode } from 'react'

import { TooltipProvider } from '@/components/ui/tooltip'

const queryClient = new QueryClient()

export const Providers = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <Script
        defer
        data-domain="interests.iamprompt.me"
        src="https://plausible.iamprompt.me/js/script.js"
      />
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </TooltipProvider>
    </>
  )
}
