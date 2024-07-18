import { DocumentType, InterestMethod } from '@/constants/accounts'

import { BankCode } from './banks'

export type InterestRate = {
  min: number
  max: number
  rate: number
  exclude?: boolean
}

export type Document = {
  type: DocumentType
  url?: string
  text?: string
}

export type Account = {
  id: number
  code: string
  name: string
  shortName?: string
  interestMethod: InterestMethod
  interestRates: InterestRate[]
  bonusInterestRates?: InterestRate[]
  documents?: Document[]
}

export const accounts: Record<BankCode, Account[]> = {
  [BankCode.CIMB]: [
    {
      id: 1,
      code: 'CIMB_CHILL_D_SAVINGS',
      name: 'บัญชีเงินฝากออมทรัพย์ชิลดี ซีไอเอ็มบี ไทย',
      shortName: 'CIMB Chill D',
      interestMethod: InterestMethod.STEP_UP,
      interestRates: [
        { min: 0, max: 10000, rate: 0.5 },
        { min: 10000, max: 50000, rate: 1.8 },
        { min: 50000, max: 100000, rate: 2.88 },
        { min: 100000, max: Infinity, rate: 0.2 },
      ],
      documents: [
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://www.cimbthai.com/content/dam/cimbth/personal/documents/products/pdf/th/accounts/savings-account/2024/%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%82%E0%B8%B1%E0%B9%89%E0%B8%99%E0%B8%95%E0%B9%88%E0%B8%B3%20%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%E0%B8%9D%E0%B8%B2%E0%B8%81%E0%B8%AD%E0%B8%AD%E0%B8%A1%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%9E%E0%B8%A2%E0%B9%8C%E0%B8%8A%E0%B8%B4%E0%B8%A5%E0%B8%94%E0%B8%B5%20(TH)_Eff%202024.06.04.pdf',
        },
        {
          type: DocumentType.WEBSITE,
          url: 'https://www.cimbthai.com/th/personal/products/accounts/savings-account/chill-d-savings-by-cimb-thai-maximum-interest-at-2-aa.html',
        },
      ],
    },
    {
      id: 2,
      code: 'CIMB_SPEED_D_PLUS_SAVINGS',
      name: 'เงินฝากออมทรัพย์ สปีดดี พลัส ซีไอเอ็มบี ไทย (Speed D+)',
      shortName: 'CIMB Speed D+',
      interestMethod: InterestMethod.WHOLE,
      interestRates: [
        { min: 0, max: 100000, rate: 0.8 },
        { min: 100000, max: 20000000, rate: 1.88 },
        { min: 20000000, max: Infinity, rate: 0.5 },
      ],
      documents: [
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://www.cimbthai.com/content/dam/cimbth/personal/documents/products/pdf/th/accounts/deposit/2024/03-2024/%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%82%E0%B8%B1%E0%B9%89%E0%B8%99%E0%B8%95%E0%B9%88%E0%B8%B3_%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%E0%B8%9D%E0%B8%B2%E0%B8%81%E0%B8%AD%E0%B8%AD%E0%B8%A1%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%9E%E0%B8%A2%E0%B9%8C_%E0%B8%AA%E0%B8%9B%E0%B8%B5%E0%B8%94%E0%B8%94%E0%B8%B5_%E0%B8%9E%E0%B8%A5%E0%B8%B1%E0%B8%AA_TH_Eff.2024.03.26.pdf',
        },
        {
          type: DocumentType.WEBSITE,
          url: 'https://www.cimbthai.com/th/personal/products/accounts/savings-account/speed-d-plus-savings-by-cimb-thai.html',
        },
      ],
    },
  ],
  [BankCode.LHB]: [
    {
      id: 7,
      code: 'LHB_B_YOU_WEALTH',
      name: 'บัญชีออมทรัพย์ดิจิทัล บียู เวลท์',
      shortName: 'B You Wealth',
      interestMethod: InterestMethod.STEP_UP,
      interestRates: [
        { min: 0, max: 100000, rate: 0.25 },
        { min: 100000, max: 900000, rate: 1.75 },
        { min: 900000, max: 1000000, rate: 5.55 },
        { min: 1000000, max: 3000000, rate: 1.5 },
        { min: 3000000, max: 100000000, rate: 0.25 },
      ],
      documents: [
        {
          type: DocumentType.WEBSITE,
          url: 'https://www.lhbank.co.th/th/personal/recommended-product-all-promotions/deposits/b-you-wealth/',
        },
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://www.lhbank.co.th/getattachment/985ccf71-2b08-4eb5-adfc-c31077959f3d/personal-recommended-product-all-promotions-deposits-b-you-wealth-document-Sales-Sheet-03-(1)',
        },
      ],
    },
    {
      id: 8,
      code: 'LHB_PRO_FIT',
      name: 'บัญชีออมทรัพย์ดิจิทัล โปร-ฟิต',
      shortName: 'Pro Fit',
      interestMethod: InterestMethod.STEP_UP,
      interestRates: [
        { min: 0, max: 3000000, rate: 1.5 },
        { min: 3000000, max: 50000000, rate: 1.75 },
        { min: 50000000, max: 500000000, rate: 0.25 },
      ],
      documents: [
        {
          type: DocumentType.WEBSITE,
          url: 'https://www.lhbank.co.th/th/personal/deposits/pro-fit-digital-savings-detail/',
        },
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://www.lhbank.co.th/getattachment/683a0828-a559-4389-8da2-27f1c167327c/personal-%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%E0%B8%9D%E0%B8%B2%E0%B8%81-%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%E0%B8%9D%E0%B8%B2%E0%B8%81%E0%B8%94%E0%B8%B4%E0%B8%88%E0%B8%B4%E0%B8%97%E0%B8%B1%E0%B8%A5-pro-fit-digital-savings-detail-%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B9%80%E0%B8%81%E0%B8%A2%E0%B8%A7%E0%B8%82%E0%B8%AD%E0%B8%87-%E0%B8%84%E0%B8%B9%E0%B9%88%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%9A%E0%B8%B1%E0%B8%8D%E0%B8%8A%E0%B8%B5%E0%B8%AD%E0%B8%AD%E0%B8%A1%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%9E%E0%B8%A2%E0%B9%8C%E0%B8%94%E0%B8%B4%E0%B8%88%E0%B8%B4%E0%B8%97%E0%B8%B1%E0%B8%A5-%E0%B9%82%E0%B8%9B%E0%B8%A3-%E0%B8%9F%E0%B8%B4%E0%B8%95',
        },
      ],
    },
  ],
  [BankCode.KKP]: [
    {
      id: 3,
      code: 'DIME_SAVE',
      name: 'บัญชีเงินฝากออมทรัพย์ Dime! Save',
      shortName: 'Dime! Save',
      interestMethod: InterestMethod.STEP_UP,
      interestRates: [
        { min: 0, max: 10000, rate: 3.0 },
        { min: 10000, max: 1000000, rate: 1.5 },
        { min: 1000000, max: Infinity, rate: 0.5 },
      ],
      documents: [
        {
          type: DocumentType.WEBSITE,
          url: 'https://dime.co.th/save/dime-save',
        },
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://media.kkpfg.com/document/2022/Jul/SaleSheet_Dime!_Saving.pdf',
        },
      ],
    },
    {
      id: 4,
      code: 'KKP_START_SAVING',
      name: 'บัญชีเงินฝากออมทรัพย์ KKP START SAVING',
      shortName: 'KKP Start Saving',
      interestMethod: InterestMethod.STEP_UP,
      interestRates: [
        { min: 0, max: 50000, rate: 2.0 },
        { min: 50000, max: 1500000, rate: 1.55 },
        { min: 1500000, max: Infinity, rate: 0.5 },
      ],
      bonusInterestRates: [{ min: 5000, max: 10000, rate: 2.0 }],
      documents: [
        {
          type: DocumentType.WEBSITE,
          url: 'https://bank.kkpfg.com/th/personal-banking/deposit/savings-account/kkp-start-saving',
        },
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://media.kkpfg.com/document/2020/Aug/SaleSheet_KKP_Start_Saving.pdf',
        },
      ],
    },
    {
      id: 9,
      code: 'KKP_KKP_SAVVY',
      name: 'บัญชีเงินฝากออมทรัพย์ KKP SAVVY',
      shortName: 'KKP Savvy',
      interestMethod: InterestMethod.WHOLE,
      interestRates: [
        { min: 0, max: 10000, rate: 0.5 },
        { min: 10000, max: 200000, rate: 1.5 },
        { min: 200000, max: 2000000, rate: 1.65 },
        { min: 2000000, max: 5000000, rate: 1.8 },
        { min: 5000000, max: Infinity, rate: 0.5, exclude: true },
      ],
      documents: [
        {
          type: DocumentType.WEBSITE,
          url: 'https://bank.kkpfg.com/th/personal-banking/deposit/savings-account/kkp-savvy',
        },
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://media.kkpfg.com/document/2020/Nov/SaleSheet_KKP_Savvy.pdf',
        },
      ],
    },
  ],
  [BankCode.TTB]: [
    {
      id: 6,
      code: 'TTB_ME_SAVE',
      name: 'บัญชี ทีทีบี มีเซฟ',
      shortName: 'TTB Me Save',
      interestMethod: InterestMethod.STEP_UP,
      interestRates: [
        { min: 0, max: 100000, rate: 1 },
        { min: 100000, max: 1000000, rate: 0.4 },
        { min: 1000000, max: Infinity, rate: 0 },
      ],
      bonusInterestRates: [{ min: 0, max: Infinity, rate: 1.2 }],
      documents: [
        {
          type: DocumentType.WEBSITE,
          url: 'https://www.ttbbank.com/th/personal/deposits/savings-account/ttb-me-save',
        },
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://media.ttbbank.com/1/document/deposit/ss_me.pdf',
        },
      ],
    },
  ],
  [BankCode.TCR]: [
    {
      id: 5,
      code: 'TCR_ALPHA_SAVINGS',
      name: 'บัญชีเงินฝากออมทรัพย์อัลฟา',
      shortName: 'alpha savings',
      interestMethod: InterestMethod.STEP_UP,
      interestRates: [
        { min: 0, max: 500000, rate: 2.0 },
        { min: 500000, max: Infinity, rate: 0.7 },
      ],
      documents: [
        {
          type: DocumentType.WEBSITE,
          url: 'https://www.thaicreditbank.com/th/info/226/69/alpha-saving-account',
        },
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://adminweb.thaicreditbank.com/Files/Site0/%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%E0%B8%9D%E0%B8%B2%E0%B8%81/1Jul2024/2-9-SaleSheet-%E0%B8%AD%E0%B8%AD%E0%B8%A1%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%9E%E0%B8%A2%E0%B9%8C%E0%B8%AD%E0%B8%B1%E0%B8%A5%E0%B8%9F%E0%B8%B2-TH.pdf',
        },
      ],
    },
  ],
  [BankCode.GHB]: [
    {
      id: 5,
      code: 'GHB_KEP_AOM_SAVINGS',
      name: 'เงินฝากออมทรัพย์เก็บออม',
      shortName: 'เก็บออม',
      interestMethod: InterestMethod.WHOLE,
      interestRates: [
        { min: 0, max: 200000, rate: 1.95 },
        { min: 200000, max: Infinity, rate: 0.45 },
      ],
      documents: [
        {
          type: DocumentType.WEBSITE,
          url: 'https://www.ghbank.co.th/product-detail/kred-oom-saving',
        },
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://www.ghbank.co.th/uploads/product/sale_sheet/19299_4fa46ddd62e2b4ce329ff3318c33226f68cd1219_423.pdf',
        },
      ],
    },
    {
      id: 5,
      code: 'GHB_WELFARE_SAVINGS',
      name: 'GHB Welfare Savings',
      shortName: 'GHB Welfare Savings',
      interestMethod: InterestMethod.WHOLE,
      interestRates: [
        { min: 0, max: 10000000, rate: 1.85 },
        { min: 10000000, max: Infinity, rate: 1.0 },
      ],
      documents: [
        {
          type: DocumentType.WEBSITE,
          url: 'https://www.ghbank.co.th/product-detail/ghb-welfare-savings-apr',
        },
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://www.ghbank.co.th/uploads/product/sale_sheet/19048_aab1fe21088972538502517a3d612aee0da59349_418.PDF',
        },
      ],
    },
  ],
  [BankCode.TISCO]: [],
  [BankCode.GSB]: [],
  [BankCode.BAY]: [],
  [BankCode.KTB]: [],
  [BankCode.UOB]: [],
  [BankCode.SCB]: [],
  [BankCode.KBANK]: [],
  [BankCode.BBL]: [],
}

export const accountsMap = new Map(
  Object.entries(accounts)
    .flatMap(([bankCode, accounts]) =>
      accounts.map((account) => ({ ...account, bank: bankCode as BankCode })),
    )
    .map((account) => [account.code, account]),
)

export const accountsList = Object.entries(accounts)
  .flatMap(([bankCode, accounts]) =>
    accounts.map((account) => ({ ...account, bank: bankCode as BankCode })),
  )
  .sort((a, b) => a.id - b.id)
