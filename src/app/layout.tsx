import '@/styles/globals.css'

import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'

import { Footer } from '@/components/Footer'

import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Money Growth - ปล่อยให้เงินทำงาน',
  description:
    'คำนวณอัตราดอกเบี้ยและเปรียบเทียบบัญชีเงินฝากออมทรัพย์ดอกเบี้ยสูงในธนาคารต่าง ๆ',
}

export const viewport: Viewport = {
  userScalable: false,
}

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="th">
      {process.env.GTM_ID && <GoogleTagManager gtmId={process.env.GTM_ID} />}
      <body>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
