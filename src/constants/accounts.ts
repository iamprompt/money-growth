import { ExternalLink, FileTextIcon } from 'lucide-react'

export enum InterestMethod {
  STEP_UP = 'STEP_UP',
  WHOLE = 'WHOLE',
}

export const InterestMethodMap = {
  [InterestMethod.STEP_UP]: 'ดอกเบี้ยแบบขั้นบันได',
  [InterestMethod.WHOLE]: 'ดอกเบี้ยทั้งจำนวน',
}

export enum DocumentType {
  SALES_SHEET = 'SALES_SHEET',
  TERM_SHEET = 'TERM_SHEET',
  WEBSITE = 'WEBSITE',
}

export const DocumentTypeMap = {
  [DocumentType.SALES_SHEET]: {
    title: 'ตารางเปิดเผยข้อมูลผลิตภัณฑ์',
    icon: FileTextIcon,
  },
  [DocumentType.TERM_SHEET]: {
    title: 'เอกสารข้อกำหนดและเงื่อนไข',
    icon: FileTextIcon,
  },
  [DocumentType.WEBSITE]: {
    title: 'เว็บไซต์',
    icon: ExternalLink,
  },
}
