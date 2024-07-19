import '@/styles/globals.css'

import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'

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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
