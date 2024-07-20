'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

import { TooltipProvider } from '@/components/ui/tooltip'

const queryClient = new QueryClient()

export const Providers = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </TooltipProvider>
    </>
  )
}
