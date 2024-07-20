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

export type Bank = {
  code: string
  color: `#${string}`
  officialNameTh: string
  officialNameEn: string
  nameTh: string
  nameEn: string
  swiftCode: string
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
    icon: {
      path: '/images/banks/baac.svg',
      bgColor: '#2B3788',
    },
  },
}
