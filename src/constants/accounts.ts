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
