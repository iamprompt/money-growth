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
  code: string
  name: string
  shortName?: string
  interestMethod: InterestMethod
  interestRates: InterestRate[]
  bonusInterestRates?: InterestRate[]
  bonusConditions?: string
  documents?: Document[]
  icon?: {
    path: string
    bgColor?: `#${string}`
  }
}

export const accounts: Record<BankCode, Account[]> = {
  [BankCode.CIMB]: [
    {
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
      code: 'DIME_SAVE',
      name: 'บัญชีเงินฝากออมทรัพย์ Dime! Save',
      shortName: 'Dime! Save',
      interestMethod: InterestMethod.STEP_UP,
      interestRates: [
        { min: 0, max: 10000, rate: 3.0 },
        { min: 10000, max: 1000000, rate: 1.5 },
        { min: 1000000, max: Infinity, rate: 0.5 },
      ],
      bonusInterestRates: [{ min: 0, max: 10000, rate: 2.0 }],
      bonusConditions:
        'ลูกค้าต้องเปิดบัญชีลงทุนผ่านแอปพลิเคชัน Dime! ให้สำเร็จและทำรายการซื้อหุ้นสหรัฐอเมริกาและ/หรือ ETF ต่างประเทศ (ไม่นับรวมรายการล่วงหน้า (DCA)) มูลค่ารวมทั้งสิ้น 5,000 บาทขึ้นไปภายในวันที่ 29 มิถุนายน 2567 - 30 สิงหาคม 2567 โดยนับเฉพาะรายการที่จับคู่เรียบร้อยแล้ว',
      icon: {
        path: '/images/banks/dime.svg',
        bgColor: '#5DF591',
      },
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
      code: 'KKP_START_SAVING',
      name: 'บัญชีเงินฝากออมทรัพย์ KKP START SAVING',
      shortName: 'KKP Start Saving',
      icon: {
        path: '/images/banks/kkp_tmn.png',
        bgColor: '#FFF3E9',
      },
      interestMethod: InterestMethod.STEP_UP,
      interestRates: [
        { min: 0, max: 50000, rate: 2.0 },
        { min: 50000, max: 1500000, rate: 1.55 },
        { min: 1500000, max: Infinity, rate: 0.5 },
      ],
      bonusInterestRates: [{ min: 5000, max: 10000, rate: 2.0 }],
      bonusConditions:
        'เมื่อสมัครบริการตั้งฝากอัตโนมัติจากแอป TrueMoney Wallet เข้าไปยัง KKP START SAVING ระยะเวลาโปรโมชัน 26 เม.ย. - 25 ก.ค. 2567\nจ่ายดอกเบี้ยโบนัส 31 ส.ค. 2567',
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
      bonusConditions: 'มียอดฝากมากกว่าถอนในแต่ละเดือน',
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
    {
      code: 'GHB_ECO_SAVINGS',
      name: 'GHB Eco Savings',
      shortName: 'GHB Eco Savings',
      interestMethod: InterestMethod.WHOLE,
      interestRates: [
        { min: 0, max: 5000000, rate: 1.75 },
        { min: 5000000, max: Infinity, rate: 0.4 },
      ],
      documents: [
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://www.ghbank.co.th/uploads/product/sale_sheet/13956_a8efc905ac8ed05febcedb875a1e1d8b35bd09eb_279.PDF',
        },
      ],
    },
  ],
  [BankCode.TISCO]: [
    {
      code: 'TISCO_E_SAVINGS',
      name: 'TISCO e-Savings',
      shortName: 'TISCO e-Savings',
      interestMethod: InterestMethod.STEP_UP,
      interestRates: [
        { min: 0, max: 1000000, rate: 1.55 },
        { min: 1000000, max: Infinity, rate: 0.5 },
      ],
      documents: [
        {
          type: DocumentType.WEBSITE,
          url: 'https://www.tisco.co.th/th/personal/saving/e-savings.html',
        },
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://www.tisco.co.th/content/dam/tiscobank/download/deposit/salessheet-prodcat-v52.pdf',
        },
      ],
    },
  ],
  [BankCode.GSB]: [],
  [BankCode.BAY]: [
    {
      code: 'BAY_MEE_TAE_DAI_ONLINE',
      name: 'ออมทรัพย์ มีแต่ได้ ออนไลน์',
      shortName: 'ออมทรัพย์ มีแต่ได้ ออนไลน์',
      interestMethod: InterestMethod.STEP_UP,
      interestRates: [
        { min: 0, max: 2000000, rate: 1.5 },
        { min: 2000000, max: 50000000, rate: 0.65 },
        { min: 50000000, max: 500000000, rate: 0.25 },
      ],
      documents: [
        {
          type: DocumentType.WEBSITE,
          url: 'https://www.krungsri.com/th/personal/deposit/savings-account/mee-tae-dai/online',
        },
      ],
    },
  ],
  [BankCode.KTB]: [
    {
      code: 'KTB_NEXT_SAVINGS',
      name: 'Krungthai NEXT Savings',
      shortName: 'Krungthai NEXT Savings',
      interestMethod: InterestMethod.STEP_UP,
      interestRates: [
        { min: 0, max: 2000000, rate: 1.5 },
        { min: 2000000, max: Infinity, rate: 0.65 },
      ],
      documents: [
        {
          type: DocumentType.WEBSITE,
          url: 'https://krungthai.com/th/personal/deposits/212/345',
        },
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://krungthai.com/Download/product/MediaFile_25816TH_SalesSheet_03082023_NEXTSAV_Final2.pdf',
        },
        {
          type: DocumentType.TERM_SHEET,
          url: 'https://krungthai.com/Download/product/MediaFile_20924TC_NextSavings_AUG_TH.pdf',
        },
      ],
    },
  ],
  [BankCode.UOB]: [
    {
      code: 'UOB_STASH',
      name: 'UOB STASH',
      shortName: 'UOB STASH',
      interestMethod: InterestMethod.STEP_UP,
      interestRates: [
        { min: 0, max: 2000000, rate: 1.0 },
        { min: 2000000, max: Infinity, rate: 1.0 },
      ],
      bonusInterestRates: [{ min: 0, max: 2000000, rate: 0.5 }],
      bonusConditions:
        'เมื่อยอดเงินฝากเฉลี่ยของเดือนปัจจุบันมากกว่าหรือเท่ากับ ยอดเงินฝากเฉลี่ยของเดือนที่แล้ว',
      documents: [
        {
          type: DocumentType.WEBSITE,
          url: 'https://www.uob.co.th/personal/deposits/saving/stash.page',
        },
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://www.uob.co.th/web-resources/pdf/personal/deposits/salesheet-uob-stash-tmrw-th.pdf',
        },
      ],
    },
  ],
  [BankCode.SCB]: [
    {
      code: 'SCB_EASY_SAVING',
      name: 'ออมทรัพย์ อีซี่',
      shortName: 'ออมทรัพย์ อีซี่',
      interestMethod: InterestMethod.STEP_UP,
      interestRates: [
        { min: 0, max: 2000000, rate: 1.5 },
        { min: 2000000, max: 3000000, rate: 1.0 },
        { min: 3000000, max: Infinity, rate: 0.65 },
      ],
      documents: [
        {
          type: DocumentType.WEBSITE,
          url: 'https://www.scb.co.th/th/personal-banking/deposits/savings-account/easy-saving-account.html',
        },
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://www.scb.co.th/content/media/personal-banking/product-sales-sheet/deposits/ez-savings-account.pdf',
        },
        {
          type: DocumentType.TERM_SHEET,
          url: 'https://www.scb.co.th/content/media/personal-banking/terms-conditions/deposits/ez-savings-account/tc-ez-savings-account.pdf',
        },
      ],
    },
  ],
  [BankCode.KBANK]: [
    {
      code: 'KBANK_K_ESAVINGS',
      name: 'K-eSavings',
      shortName: 'K-eSavings',
      interestMethod: InterestMethod.STEP_UP,
      interestRates: [
        { min: 0, max: 500000, rate: 1.5 },
        { min: 500000, max: Infinity, rate: 0.65 },
      ],
      documents: [
        {
          type: DocumentType.WEBSITE,
          url: 'https://www.kasikornbank.com/th/personal/Digital-banking/Pages/k-esavings-account.aspx',
        },
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://www.kasikornbank.com/th/download/tc/k-esavings-deposit-sales-sheet_th.pdf',
        },
        {
          type: DocumentType.TERM_SHEET,
          url: 'https://www.kasikornbank.com/th/download/tc/Terms_and_Conditions_for_Opening_and_Use_of_K-eSavings_Account_24-6-2024-TH.pdf',
        },
      ],
    },
    {
      code: 'KBANK_MAKE',
      name: 'MAKE by KBank',
      shortName: 'MAKE by KBank',
      interestMethod: InterestMethod.STEP_UP,
      interestRates: [
        { min: 0, max: 500000, rate: 1.5 },
        { min: 500000, max: Infinity, rate: 0.65 },
      ],
      documents: [
        {
          type: DocumentType.WEBSITE,
          url: 'https://makebykbank.kbtg.tech/',
        },
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://www.kasikornbank.com/th/download/tc/k-esavings-deposit-sales-sheet_th-make-by-kbank.pdf',
        },
      ],
      icon: {
        path: '/images/banks/make.svg',
        bgColor: '#FFFFFF',
      },
    },
  ],
  [BankCode.BBL]: [
    {
      code: 'BBL_E_SAVINGS',
      name: 'สะสมทรัพย์ e-Savings',
      shortName: 'สะสมทรัพย์ e-Savings',
      interestMethod: InterestMethod.STEP_UP,
      interestRates: [
        { min: 0, max: 1000000, rate: 1.5 },
        { min: 1000000, max: Infinity, rate: 0.65 },
      ],
      documents: [
        {
          type: DocumentType.WEBSITE,
          url: 'https://www.bangkokbank.com/th-TH/Personal/Save-And-Invest/Save/e-Savings-Account',
        },
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://www.bangkokbank.com/th-TH/Personal/Save-And-Invest/Save/-/media/98199a87fe4d433f8580ce8d3d801a08.ashx',
        },
        {
          type: DocumentType.TERM_SHEET,
          url: 'https://www.bangkokbank.com/th-TH/Personal/Save-And-Invest/Save/-/media/eb33880346d943cdade39953c659b506.ashx',
        },
      ],
    },
  ],
  [BankCode.BAAC]: [
    {
      code: 'BAAC_A_SAVINGS',
      name: 'A-Savings',
      shortName: 'A-Savings',
      interestMethod: InterestMethod.STEP_UP,
      interestRates: [{ min: 0, max: Infinity, rate: 1.5 }],
      documents: [
        {
          type: DocumentType.SALES_SHEET,
          url: 'https://www.baac.or.th/file-upload/015204-1-Sale%20Sheet%20%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B8%A0%E0%B8%B1%E0%B8%93%E0%B8%91%E0%B9%8C%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%E0%B8%9D%E0%B8%B2%E0%B8%81%E0%B8%AD%E0%B8%AD%E0%B8%A1%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%9E%E0%B8%A2%E0%B9%8C%20A-Savings.pdf',
        },
      ],
    },
  ],
}

export const accountsMap = new Map(
  Object.entries(accounts)
    .flatMap(([bankCode, accounts]) =>
      accounts.map((account) => ({ ...account, bank: bankCode as BankCode })),
    )
    .map((account) => [account.code, account]),
)

export const accountsList = Object.entries(accounts).flatMap(
  ([bankCode, accounts]) =>
    accounts.map((account) => ({ ...account, bank: bankCode as BankCode })),
)

export const bonusAccountLists = accountsList.filter(
  (account) =>
    account.bonusInterestRates && account.bonusInterestRates.length > 0,
)

export const sortedOriginalAccounts = accountsList
  .map((account) => {
    const highestRate = account.interestRates.reduce(
      (acc, rate) => (rate.rate > acc ? rate.rate : acc),
      0,
    )
    return { ...account, highestRate }
  })
  .sort((a, b) => b.highestRate - a.highestRate)
