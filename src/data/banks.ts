import { Channel } from '@/constants/banks'

export enum BankCode {
  BBL = 'bbl',
  KBANK = 'kbank',
  KTB = 'ktb',
  SCB = 'scb',
  CIMB = 'cimb',
  UOB = 'uob',
  BAY = 'bay',
  GSB = 'gsb',
  GHB = 'ghb',
  TISCO = 'tisco',
  KKP = 'kkp',
  TCR = 'tcr',
  LHB = 'lhb',
  TTB = 'ttb',
  BAAC = 'baac',
}

export type BankChannel = {
  type: Channel
  key?: string
  name?: string
  uri: string
}

export type Bank = {
  code: string
  color: `#${string}`
  officialNameTh: string
  officialNameEn: string
  nameTh: string
  nameEn: string
  swiftCode: string
  website?: string
  channels?: BankChannel[]
  icon?: {
    path: string
    bgColor?: `#${string}`
  }
}

export const banks: Record<BankCode, Bank> = {
  [BankCode.BBL]: {
    code: '002',
    color: '#1e4598',
    officialNameEn: 'BANGKOK BANK PUBLIC COMPANY LIMITED',
    nameEn: 'Bangkok Bank',
    swiftCode: 'BKKBTHBK',
    officialNameTh: 'บริษัท ธนาคารกรุงเทพ จำกัด (มหาชน)',
    nameTh: 'ธนาคารกรุงเทพ',
    website: 'https://www.bangkokbank.com/th-TH/',
    channels: [
      {
        type: Channel.BRANCH,
        uri: 'https://www.bangkokbank.com/th-TH/Locate-Us',
      },
      {
        type: Channel.CALL_CENTER,
        uri: 'tel:1333',
      },
      {
        type: Channel.APP,
        key: 'bangkok_bank_mobile_banking',
        name: 'Bangkok Bank Mobile Banking',
        uri: 'https://bblmobile.onelink.me/xJQX/563aa053',
      },
    ],
    icon: {
      path: '/images/banks/bbl.svg',
      bgColor: '#0064FF',
    },
  },
  [BankCode.KBANK]: {
    code: '004',
    color: '#138f2d',
    officialNameEn: 'KASIKORNBANK PUBLIC COMPANY LIMITED',
    nameEn: 'Kasikorn Bank',
    swiftCode: 'KASITHBK,',
    officialNameTh: 'บริษัท ธนาคารกสิกรไทย จำกัด (มหาชน)',
    nameTh: 'ธนาคารกสิกรไทย',
    website: 'https://www.kasikornbank.com/th/personal',
    channels: [
      {
        type: Channel.BRANCH,
        uri: 'https://www.kasikornbank.com/th/branch/Pages/index.aspx',
      },
      {
        type: Channel.CALL_CENTER,
        name: 'K-Contact Center',
        uri: 'tel:+6628888888,02',
      },
      {
        type: Channel.APP,
        key: 'kplus',
        name: 'K PLUS',
        uri: 'https://www.kasikornbank.com/th/kplus',
      },
      {
        type: Channel.APP,
        key: 'make_by_kbank',
        name: 'MAKE by KBank',
        uri: 'https://makebykbank.kbtg.tech/',
      },
      {
        type: Channel.APP,
        key: 'line_bk',
        name: 'LINE BK',
        uri: 'https://www.linebk.com/th/',
      },
    ],
    icon: {
      path: '/images/banks/kbank.svg',
      bgColor: '#FFFFFF',
    },
  },
  [BankCode.KTB]: {
    code: '006',
    color: '#1ba5e1',
    officialNameEn: 'KRUNG THAI BANK PUBLIC COMPANY LIMITED',
    nameEn: 'Krungthai Bank',
    swiftCode: 'KRTHTHBK',
    officialNameTh: 'บริษัท ธนาคารกรุงไทย จำกัด (มหาชน)',
    nameTh: 'ธนาคารกรุงไทย',
    website: 'https://krungthai.com/th/personal',
    channels: [
      {
        type: Channel.BRANCH,
        uri: 'https://krungthai.com/th/contact-us/ktb-location',
      },
      {
        type: Channel.CALL_CENTER,
        name: 'Krungthai Contact Center',
        uri: 'tel:+6621111111',
      },
      {
        type: Channel.APP,
        key: 'krungthai_next',
        name: 'Krungthai NEXT',
        uri: 'https://krungthai.com/th/content/personal/krungthai-next',
      },
    ],
    icon: {
      path: '/images/banks/ktb.svg',
      bgColor: '#01A6E6',
    },
  },
  [BankCode.SCB]: {
    code: '014',
    color: '#4e2e7f',
    officialNameEn: 'THE SIAM COMMERCIAL BANK PUBLIC COMPANY LIMITED',
    nameEn: 'Siam Commercial Bank',
    swiftCode: 'SICOTHBK',
    officialNameTh: 'บริษัท ธนาคารไทยพาณิชย์ จำกัด (มหาชน)',
    nameTh: 'ธนาคารไทยพาณิชย์',
    website: 'https://krungthai.com/th/personal',
    channels: [
      {
        type: Channel.BRANCH,
        uri: 'https://www.scb.co.th/th/personal-banking/tools/services-locator.html',
      },
      {
        type: Channel.CALL_CENTER,
        name: 'SCB Call Center',
        uri: 'tel:+6627777777',
      },
      {
        type: Channel.APP,
        key: 'scb_easy',
        name: 'SCB EASY',
        uri: 'https://info.scb.co.th/scbeasy/easy_app_link.html?URI=scbeasy://lifestylelanding&URL=https://www.scb.co.th/th/personal-banking/digital-banking/scb-easy/get-start.html',
      },
    ],
    icon: {
      path: '/images/banks/scb.svg',
      bgColor: '#462279',
    },
  },
  [BankCode.CIMB]: {
    code: '022',
    color: '#7e2f36',
    officialNameEn: 'CIMB THAI BANK PUBLIC COMPANY LIMITED',
    nameEn: 'CIMB Thai Bank',
    swiftCode: 'UBOBTHBK',
    officialNameTh: 'บริษัท ธนาคาร ซีไอเอ็มบี ไทย จำกัด (มหาชน)',
    nameTh: 'ธนาคารซีไอเอ็มบีไทย',
    website: 'https://www.cimbthai.com/th/personal/home.html',
    channels: [
      {
        type: Channel.BRANCH,
        uri: 'https://www.cimbthai.com/th/personal/help-support/locate-us.html',
      },
      {
        type: Channel.CALL_CENTER,
        name: 'CIMB THAI Care Center',
        uri: 'tel:+6626267777',
      },
      {
        type: Channel.APP,
        key: 'cimb_thai',
        name: 'CIMB THAI Digital Banking',
        uri: 'https://click.cimbthai.com/VyQd/tj5s9jl6?af_qr=c',
      },
    ],
    icon: {
      path: '/images/banks/cimb.svg',
      bgColor: '#790008',
    },
  },
  [BankCode.UOB]: {
    code: '024',
    color: '#0b3979',
    officialNameEn: 'UNITED OVERSEAS BANK (THAI) PUBLIC COMPANY LIMITED',
    nameEn: 'United Overseas Bank (Thai)',
    swiftCode: 'UOVBTHBK',
    officialNameTh: 'บริษัท ธนาคารยูโอบี จำกัด (มหาชน)',
    nameTh: 'ธนาคารยูโอบี',
    website: 'https://www.uob.co.th/personal/index.page',
    channels: [
      {
        type: Channel.BRANCH,
        uri: 'https://www.uob.co.th/personal/location/locations-line.page',
      },
      {
        type: Channel.CALL_CENTER,
        name: 'UOB Call Center',
        uri: 'tel:+6622851555',
      },
      {
        type: Channel.APP,
        key: 'uob_tmrw',
        name: 'UOB TMRW',
        uri: 'https://uobtmrwdigith.onelink.me/tkbU',
      },
    ],
    icon: {
      path: '/images/banks/uob.svg',
      bgColor: '#005CB9',
    },
  },
  [BankCode.BAY]: {
    code: '025',
    color: '#fec43b',
    officialNameEn: 'BANK OF AYUDHYA PUBLIC COMPANY LIMITED',
    nameEn: 'Bank of Ayudhya (Krungsri)',
    swiftCode: 'AYUDTHBK',
    officialNameTh: 'บริษัท ธนาคารกรุงศรีอยุธยา จำกัด (มหาชน)',
    nameTh: 'ธนาคารกรุงศรีอยุธยา',
    website: '',
    channels: [
      {
        type: Channel.BRANCH,
        uri: 'https://www.krungsri.com/th/locations',
      },
      {
        type: Channel.CALL_CENTER,
        uri: 'tel:1572',
      },
      {
        type: Channel.APP,
        key: 'kma',
        name: 'KMA (Krungsri Mobile App)',
        uri: 'https://www.krungsri.com/th/personal/digital-banking/kma/home',
      },
      {
        type: Channel.APP,
        key: 'kept',
        name: 'Kept',
        uri: 'https://www.keptbykrungsri.com/home',
      },
    ],
    icon: {
      path: '/images/banks/bay.svg',
      bgColor: '#6F5F5E',
    },
  },
  [BankCode.GSB]: {
    code: '030',
    color: '#eb198d',
    officialNameEn: 'GOVERNMENT SAVINGS BANK',
    nameEn: 'Government Savings Bank',
    swiftCode: 'GSBATHBK',
    officialNameTh: 'ธนาคารออมสิน',
    nameTh: 'ธนาคารออมสิน',
    website: 'https://www.gsb.or.th/',
    channels: [
      {
        type: Channel.BRANCH,
        uri: 'https://www.gsb.or.th/contacts/gsbbranch/',
      },
      {
        type: Channel.CALL_CENTER,
        name: 'GSB Contact Center',
        uri: 'tel:1115',
      },
      {
        type: Channel.APP,
        name: 'MyMo by GSB',
        uri: 'https://www.gsb.or.th/online_service/mymo/',
      },
    ],
    icon: {
      path: '/images/banks/gsb.svg',
      bgColor: '#EC008C',
    },
  },
  [BankCode.GHB]: {
    code: '033',
    color: '#f57d23',
    officialNameEn: 'THE GOVERNMENT HOUSING BANK',
    nameEn: 'Government Housing Bank',
    swiftCode: 'GOHUTHB1',
    officialNameTh: 'ธนาคารอาคารสงเคราะห์',
    nameTh: 'ธนาคารอาคารสงเคราะห์',
    website: 'https://www.ghbank.co.th/',
    channels: [
      {
        type: Channel.BRANCH,
        uri: 'https://www.ghbank.co.th/contact/branch',
      },
      {
        type: Channel.CALL_CENTER,
        name: 'GHBank Call Center',
        uri: 'tel:+6626459000',
      },
      {
        type: Channel.APP,
        key: 'ghb_all_gen',
        name: 'GHB ALL GEN',
        uri: 'https://www.ghbank.co.th/electronic-services/application/ghb-all-gen',
      },
    ],
    icon: {
      path: '/images/banks/ghb.svg',
      bgColor: '#F7941E',
    },
  },
  [BankCode.TISCO]: {
    code: '067',
    color: '#12549f',
    officialNameEn: 'TISCO BANK PUBLIC COMPANY LIMITED',
    nameEn: 'Tisco Bank',
    swiftCode: 'TFPCTHB1',
    officialNameTh: 'บริษัท ธนาคารทิสโก้ จำกัด (มหาชน)',
    nameTh: 'ธนาคารทิสโก้',
    website: 'https://www.tisco.co.th/th/personal.html',
    channels: [
      {
        type: Channel.BRANCH,
        uri: 'https://www.tisco.co.th/th/contact-us/branch.html',
      },
      {
        type: Channel.CALL_CENTER,
        name: 'TISCO Contact Center',
        uri: 'tel:+6626336000',
      },
      {
        type: Channel.APP,
        key: 'tisco_my_wealth',
        name: 'TISCO My Wealth',
        uri: 'https://www.tisco.co.th/th/personal/service/mywealth.html',
      },
    ],
    icon: {
      path: '/images/banks/tisco.svg',
      bgColor: '#FFFFFF',
    },
  },
  [BankCode.KKP]: {
    code: '069',
    color: '#199cc5',
    officialNameEn: 'KIATNAKIN PHATRA BANK PUBLIC COMPANY LIMITED',
    nameEn: 'Kiatnakin Phatra Bank',
    swiftCode: 'KKPBTHBK',
    officialNameTh: 'บริษัท ธนาคารเกียรตินาคินภัทร จำกัด (มหาชน)',
    nameTh: 'ธนาคารเกียรตินาคินภัทร',
    website: 'https://bank.kkpfg.com/th/home',
    channels: [
      {
        type: Channel.BRANCH,
        uri: 'https://bank.kkpfg.com/th/branch',
      },
      {
        type: Channel.CALL_CENTER,
        name: 'KKP Contact Center',
        uri: 'tel:+66216555555',
      },
      {
        type: Channel.APP,
        key: 'kkp_mobile',
        name: 'KKP Mobile',
        uri: 'https://bank.kkpfg.com/th/personal-banking/digital-banking/kkp-mobile',
      },
      {
        type: Channel.APP,
        key: 'dime',
        name: 'Dime',
        uri: 'https://dime.co.th/',
      },
      {
        type: Channel.APP,
        key: 'truemoney_wallet',
        name: 'TrueMoney Wallet',
        uri: 'https://www.truemoney.com/',
      },
    ],
    icon: {
      path: '/images/banks/kkp.svg',
      bgColor: '#635F98',
    },
  },
  [BankCode.TCR]: {
    code: '071',
    color: '#0a4ab3',
    officialNameEn: 'THAI CREDIT BANK PUBLIC COMPANY LIMITED',
    nameEn: 'Thai Credit Bank',
    swiftCode: 'THCETHB1',
    officialNameTh: 'บริษัท ธนาคารไทยเครดิต จำกัด (มหาชน)',
    nameTh: 'ธนาคารไทยเครดิต',
    website: 'https://www.thaicreditbank.com/th',
    channels: [
      {
        type: Channel.BRANCH,
        uri: 'https://www.thaicreditbank.com/th/%E0%B8%AA%E0%B8%B2%E0%B8%82%E0%B8%B2%E0%B8%98%E0%B8%99%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%A3',
      },
      {
        type: Channel.CALL_CENTER,
        uri: 'tel:+6626975454',
      },
      {
        type: Channel.APP,
        key: 'alpha',
        name: 'alpha by Thai Credit',
        uri: 'https://alpha.thaicreditbank.com/th',
      },
    ],
    icon: {
      path: '/images/banks/tcr.svg',
      bgColor: '#FFFFFF',
    },
  },
  [BankCode.LHB]: {
    code: '073',
    color: '#6d6e71',
    officialNameEn: 'LAND AND HOUSES BANK PUBLIC COMPANY LIMITED',
    nameEn: 'Land and Houses Bank',
    swiftCode: 'LAHRTHB2',
    officialNameTh: 'บริษัท ธนาคารแลนด์ แอนด์ เฮ้าส์ จำกัด (มหาชน)',
    nameTh: 'ธนาคารแลนด์ แอนด์ เฮ้าส์',
    website: 'https://www.lhbank.co.th/th/personal/',
    channels: [
      {
        type: Channel.BRANCH,
        uri: 'https://www.lhbank.co.th/th/branch-locations/',
      },
      {
        type: Channel.CALL_CENTER,
        uri: 'tel:1327',
      },
      {
        type: Channel.APP,
        key: 'lhb_you',
        name: 'LHB YOU',
        uri: 'https://www.lhbank.co.th/th/personal/digitalbanking/lhbyou/',
      },
    ],
    icon: {
      path: '/images/banks/lhbank.svg',
      bgColor: '#FFFFFF',
    },
  },
  [BankCode.TTB]: {
    code: '076',
    color: '#ecf0f1',
    officialNameEn: 'TMBTHANACHART BANK PUBLIC COMPANY LIMITED',
    nameEn: 'TMBThanachart Bank',
    swiftCode: 'TMBKTHBK',
    officialNameTh: 'บริษัท ธนาคารทหารไทยธนชาต จำกัด (มหาชน)',
    nameTh: 'ธนาคารทหารไทยธนชาต',
    website: 'https://www.ttbbank.com/th',
    channels: [
      {
        type: Channel.BRANCH,
        uri: 'https://www.ttbbank.com/th/contact/location/branch',
      },
      {
        type: Channel.CALL_CENTER,
        name: 'TTB Contact Center',
        uri: 'tel:1428',
      },
      {
        type: Channel.APP,
        key: 'ttb_touch',
        name: 'TTB Touch',
        uri: 'https://www.ttbbank.com/th/ttb-touch',
      },
    ],
    icon: {
      path: '/images/banks/ttb.svg',
      bgColor: '#FFFFFF',
    },
  },
  [BankCode.BAAC]: {
    code: '034',
    color: '#4b9b1d',
    officialNameEn: 'BANK FOR AGRICULTURE AND AGRICULTURAL COOPERATIVES',
    officialNameTh: 'ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร',
    nameEn: 'Bank for Agriculture and Agricultural Cooperatives',
    nameTh: 'ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร',
    swiftCode: 'BAABTHBK',
    website: 'https://www.baac.or.th/th/',
    channels: [
      {
        type: Channel.BRANCH,
        uri: 'https://www.baac.or.th/th/content-contact.php?content_group_sub=7',
      },
      {
        type: Channel.CALL_CENTER,
        uri: 'tel:+6625550555',
      },
      {
        type: Channel.APP,
        key: 'baac_mobile',
        name: 'BAAC Mobile',
        uri: 'https://www.baac.or.th/th/content-product.php?content_group_semi=0015&content_group_sub=8&content_group=4&inside=1',
      },
    ],
    icon: {
      path: '/images/banks/baac.svg',
      bgColor: '#2B3788',
    },
  },
}

export const bankChannels = Object.entries(banks).reduce(
  (acc, [bankCode, { channels = [] }]) => {
    acc[bankCode as BankCode] = channels.reduce(
      (acc, channel) => {
        const key = `${channel.type}:${channel.key || 'default'}`
        acc[key] = channel
        return acc
      },
      {} as Record<string, BankChannel>,
    )
    return acc
  },
  {} as Record<BankCode, Record<string, BankChannel>>,
)
