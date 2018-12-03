/**
 * @author 田尘殇Sean(sean.snow@live.com)
 * @date 2017/3/1
 */

export const lang = {
  login: '登录',
  loginName: '登录名称',
  loginPassword: '登录密码',

  debitCard: '储蓄卡',
  creditCard: '信用卡',
  semiCreditCard: '准贷记卡',
  prepaidCard: '预付费卡',

  processing: '正在处理中',
  collectMoneySuccess: '收款成功',
  waitPayment: '等待支付',
  success: '成功',
  init: '初始化',
  warn: '部分失败',
  wait: '等待',
  execute: '执行中',
  exception: '异常',
  untreated: '未处理',
  cancelled: '已取消',
  failure: '失败',
  status: '状态',
  stage: '阶段',
  resolve: '同意',
  rejected: '拒绝',
  proxyMode: '垫付类型',
  agentMode: '垫付类型',

  mpos: 'POS支付',
  quickPay: '快捷支付',
  aliPay: '支付宝',
  weChatPay: '微信支付',

  paymentType: '支付类型',
  createAt: '创建时间',
  updateAt: '更新时间',
  tradeAt: '交易时间',
  paymentAt: '支付时间',
  statementAt: '对账日',
  settleAt: '结算时间',
  businessTime: '营业时间',
  actionDate: '操作日期',

  yes: '是',
  no: '否',
  ok: '确定',
  settings: '设置',
  message: '消息',
  describe: '描述',
  remark: '备注',
  name: '姓名',
  gender: '性别',
  phoneNo: '手机号',
  email: '邮箱',
  birthday: '生日',
  male: '男',
  female: '女',
  address: '地址',
  region: '地区',

  open: '启用',
  close: '关闭',
  cancel: '取消',
  confirm: '确认',
  edit: '保存',
  add: '立即添加',
  disabled: '禁用',
  normal: '正常',
  review: '审核中',
  invalid: '无效',
  waitActive: '等待激活',
  delete: '删除',
  public: '对公',
  private: '对私',
  d0: 'D0',
  t0: 'T+0',
  t1: 'T+1',
  t7: 'T+7',
  t15: 'T+15',
  t30: 'T+30',
  t90: 'T+90',
  t180: 'T+180',
  t365: 'T+365',
  gt: '大于',
  ge: '大于等于',
  lt: '小于',
  le: '小于等于',
  eq: '等于',
  range: '范围值',

  basicInfo: '基本信息',
  explain: '修改说明',
  costInfo: '结算信息',
  changeInfo: '修改信息',
  businessInfo: '业务信息',
  returnedInfo: '退货信息',
  rateInfo: '费率信息',
  yuan: '元',
  scan: '扫一扫',
  balance: '余额',
  bankCard: '银行卡',
  bankCardNumber: '银行卡号',
  bankCardType: '卡片类型',
  collectMoney: '收款',
  collectMoneyRecord: '收款记录',
  collectMoneyFail: '收款失败',
  collectMoneyAuditNumber: '收款流水号',
  collectMoneyAt: '收款时间',
  authBankCard: '授权银行卡',

  merchantService: '商户服务',
  merchantManage: '完善经营信息',

  settleInfo: '结算信息',
  settleType: '结算类型',
  settleCycle: '结算周期',
  accountType: '账户类型',
  accountName: '账户名',
  accountNo: '账号',
  openBank: '开户行',
  bankReservedPhone: '银行预留手机号',
  updateSettle: '修改结算信息',
  updateBasic: '修改基本信息',

  submit: '提交',
  signUp: '立即注册',
  hasAccountLoginNow: '已经有账号?立即登录',
  goSettings: '去设置',
  getCheckValue: '获取验证码',
  checkValue: '验证码',
  newPassword: '新密码',
  resetPassword: '重置密码',
  passwordModify: '修改密码',
  evalState: '修改状态',
  tradeDown: '交易下载',
  settlePaymentDown: '对账文件下载',
  settleTaskDown: '出款文件下载',
  saveNewPassword: '确定保存新密码',
  oldPassword: '原密码',
  aboutUs: '关于我们',
  signOut: '安全退出',
  feedback: '反馈',
  toScore: '去评分',

  idType: '证件类型',
  idNo: '证件编号',
  idCard: '身份证',
  tmpIdCard: '临时身份证',
  officer: '官员证',
  civil: '公民证',
  policeOfficer: '警官证',
  soldiers: '士兵证',
  passport: '护照',
  hkMacao: '港澳通行证',

  legalPerson: '法人姓名',
  legalPersonPhone: '法人电话',
  legalIdNo: '法人身份证号码',
  legalEmail: '法人邮箱',
  linkman: '联系人',
  linkPhone: '联系人电话',
  linkEmail: '联系人邮箱',

  cardNo: '银行卡卡号',
  expireDate: '有效日期',
  cvv: 'cvv',
  reservedPhone: '预留手机号',

  nature: '性质',
  personal: '个人',
  enterprise: '企业',

  businessLicense: '企业证件号',
  businessType: '业务类型',
  singleMinLimit: '单笔最小限额',
  singleMaxLimit: '单笔最大限额',
  refundPeriod: '退货期限',
  enabledRefund: '是否允许退货',
  feeRefund: '退货是否退手续费',
  percentage: '百分比',
  cap_percentage: '封顶加百分比',
  cap: '固定值',
  normalFeeRate: {
    value: '费率',
    type: '费率类型',
    min: '最低收费',
    max: '最高收费'
  },
  serviceFeeRate: {
    value: '服务费率',
    type: '服务费类型',
    min: '最低收费',
    max: '最高收费'
  },
  posFeeRate: {
    debit: {
      value: '借记卡费率',
      type: '借记卡类型',
      min: '最低收费',
      max: '最高收费'
    },
    ownerDebit: {
      value: '本行借记卡费率',
      type: '本行借记卡类型',
      min: '最低收费',
      max: '最高收费'
    },
    credit: {
      value: '贷记卡费率',
      type: '贷记卡类型',
      min: '最低收费',
      max: '最高收费'
    },
    ownerCredit: {
      value: '本行贷记卡费率',
      type: '本行贷记卡类型',
      min: '最低收费',
      max: '最高收费'
    },
    abroadDebit: {
      value: '外卡-借记卡费率',
      type: '外卡-借记卡类型',
      min: '最低收费',
      max: '最高收费'
    },
    abroadCredit: {
      value: '外卡-贷记卡费率',
      type: '外卡-贷记卡类型',
      min: '最低收费',
      max: '最高收费'
    }
  },
  holidayEnabled: '节假日状态',
  businessTimeStart: '产品开放时间',
  businessTimeEnd: '产品关闭时间',
  feeSplittingRate: '酬金分润比例',
  channelFlag: '通道标识',
  agencyCode: '机构代码',

  merchantMode: '商户代理模式',
  merchantSelectMode: '商户选择',
  merchantAuthenticationMode: '商户认证模式',
  weChatPayChannelNo: '微信支付渠道号',
  fourHolder: '四要素鉴权',
  threeHolder: '三要素鉴权',
  towHolder: '二要素鉴权',
  manualVerify: '人工审核',
  notAuthentication: '不认证',

  settleCardNo: '结算银行卡卡号',
  settleName: '结算名称',
  settleBankNo: '结算银行联行号',
  settleReservedPhone: '结算银行卡预留手机号',
  merchantOneToOne: '一对一本地商户',
  merchantOneToMany: '对应多个本地商户',
  merchantLocal: '当地商户',
  priority: '优先级',
  key: "密钥",
  privateKey: "私钥",
  publicKey: "公钥",
  minGreaterMaxMessage: '请检查，最低收费不能大于最大收费',
  formErrorMessage: key => `请输入您的${key}`,
  permissionError: permission => `获取 ${permission} 数据失败，请配置相关权限`,
  pleaseSelectDateTip: '请选择数据再进行操作',
  notRule: '权限不足!',
  notEmpty: '必填项',
  notChannel: '获取交易通道失败',
  failedData: '获取数据失败',
  pleaseSelect: '请选择',

  loginNameTip: '商户号/法人手机号/用户名',
  loginPasswordTip: '登录密码',
  loginText: '立即登录',
  agency: {
    updateKey: '上传机构密钥',
    path: '指定机构',
    info: '机构信息',
    address: '机构地址',
    street: '详细地址',
    phone: '机构电话',
    id: '机构代码',
    title: '机构',
    code: '机构编号',
    name: '机构名称',
    expiresTime: '合同到期时间',
    settleAccount: '结算账户信息',
    status: '机构状态',
    type: '机构类型',
    parentId: '上级机构',
    parentAgency: '所属上级',
    childAgency: '下级机构',
    legalInfo: '法人信息',
    linkmanInfo: '联系人信息',
    accountName: '结算账户名',
    accountNumber: '结算账户号',
    accountType: '结算账户类型',
    settleType: '结算类型',
    settleBank: '结算银行',
    settleBankName: '结算银行名称',
    settleBankNo: '结算银行行号',
    identitiesType: '证件类型',
    identitiesNumber: '证件号',
    accountBank: '银行卡结算',
    accountAliPay: '支付宝结算',
    bankReservedPhone: '银行预留手机号',
    website: '网站主页'
  },
  agencyBusiness: {
    title: '机构业务信息'
  },
  agencyProfit: {
    totalAmount: '交易金额'
  },
  channelMerchant: {
    title: '通道商户信息',
    no: '通道商户号',
    number: '通道流水号',
    localMerchantNo: '本地商户号'
  },
  channelConfig: {
    settleMethod: '结算方式',
    oneToOneCreate: '商户一对一新增',
    creditCardType: '还款代理模式',
    child_settle: '商户自主结算',
    d0_settle: 'D0结算',
    t1_settle: 'T1结算'
  },
  merchant: {
    changeExplain: '更改说明',
    rateTemplateTitle: '费率模版',
    active: '是否激活',
    explain: '修改说明',
    address: {
      city: '市',
      county: '区',
      province: '省份',
      street: '详细地址'
    },
    agency: {
      code: '机构代码',
      id: '机构id',
      name: '机构名称',
      path: '机构路径'
    },
    aliPayMcc: '支付宝MCC',
    businessLicense: {
      number: '企业证件号',
      type: '商户证件类型'
    },
    businessTime: {
      open: '营业开始时间',
      close: '营业结束时间'
    },
    businessScope: '经营范围',
    createAt: '创建时间',
    faxNo: '传真',
    feeSettleAccount: {
      name: '扣款账户名',
      accountType: '扣款账户类型',
      bankName: '扣款银行名称',
      bankNo: '扣款银行行号',
      bankReservedPhone: '银行预留手机号',
      number: '扣款账户号',
      settleType: '扣款类型',
      settleBank: '扣款银行',
      accountName: '扣款账户名',
      accountNumber: '扣款账户号',
    },
    feeSettleCycle: '手续费收取周期',
    key: {
      privateKey: '私钥',
      publicKey: '密钥'
    },
    legalPerson: {
      email: '法人邮箱',
      idCard: {
        number: '证件号',
        type: '证件类型'
      },
      identities: [{
        number: '证件号',
        type: '证件类型'
      }],
      name: '法人姓名',
      phoneNo: '法人电话'
    },
    linkman: {
      email: '联系人邮箱',
      idCard: {
        number: '证件号',
        type: '证件类型'
      },
      identities: [{
        number: '证件号',
        type: '证件类型'
      }],
      name: '联系人',
      phoneNo: '联系人电话'
    },
    merchantName: '商户名称',
    merchantNo: '商户号',
    nature: '商户性质',
    serviceTel: '服务电话',
    settleAccount: {
      accountType: '结算账户类型',
      bankName: '结算银行名称',
      bankNo: '结算银行行号',
      bankReservedPhone: '银行预留手机号',
      name: '结算账户名',
      number: '结算账户号',
      settleType: '结算类型'
    },
    settleMode: '结算模式',
    status: '商户状态',
    title: '商户简称',
    unionMcc: '银联MCC',
    weChatPayMcc: '微信MCC',
    website: '网站主页',

    info: '商户信息',
    id: '商户id',
    local: '本地商户',
    number: '商户号',
    name: '商户名称',
    subAuditNumber: '商户流水号',
    goToBusinessTitle: '查看商户详情',
    businessTimeOpen: '营业开始时间',
    businessTimeClose: '营业结束时间',
    uploadPublicKey: '上传公钥',
    feeSettleAccountString: '手续费扣款账户',
    businessIdType: '商户证件类型',
    industry: '商户所属行业',
    difference: '差额结算',
    fullAmount: '全额结算',
    businessLicenseString: '营业执照',
    businessLicenseAllOne: '多证合一的营业执照',
    institution: '事业单位证书',
    education: '教育',
    financial: '金融',
    travel: '旅游',
    shopping: '购物',
    supermarket: '超市便利店',
    entertainment: '娱乐休闲',
    food: '饮食',
    car: '汽车',
    health: '医疗健康',
    game: '游戏',
    salesWholesale: '销售批发',
    governmentSocialOrg: '政府/社会组织',
    service: '生活服务',
    other: '其他',
    processingMode: '处理方式',
    system: '系统处理',
    manual: '人工处理'
  },
  merchantBusiness: {
    businessTime: {
      close: '产品开放时间',
      open: '产品关闭时间'
    },
    businessType: '业务类型',
    enabled: '业务状态',
    holidayEnabled: '节假日状态',
    normalFeeRate: {
      value: '费率',
      type: '费率类型',
      min: '最低收费',
      max: '最高收费'
    },
    serviceFeeRate: {
      value: '服务费率',
      type: '服务费类型',
      min: '最低收费',
      max: '最高收费'
    },
    posFeeRate: {
      debit: {
        value: '借记卡费率',
        type: '借记卡类型',
        min: '最低收费',
        max: '最高收费'
      },
      ownerDebit: {
        value: '本行借记卡费率',
        type: '本行借记卡类型',
        min: '最低收费',
        max: '最高收费'
      },
      credit: {
        value: '贷记卡费率',
        type: '贷记卡类型',
        min: '最低收费',
        max: '最高收费'
      },
      ownerCredit: {
        value: '本行贷记卡费率',
        type: '本行贷记卡类型',
        min: '最低收费',
        max: '最高收费'
      },
      abroadDebit: {
        value: '外卡-借记卡费率',
        type: '外卡-借记卡类型',
        min: '最低收费',
        max: '最高收费'
      },
      abroadCredit: {
        value: '外卡-贷记卡费率',
        type: '外卡-贷记卡类型',
        min: '最低收费',
        max: '最高收费'
      }
    },
    settleCycle: '结算周期',
    settleType: '结算类型',
    singleMinLimit: '单笔最小限额',
    singleMaxLimit: '单笔最大限额',
    dayLimit: '单日限额',
    feeRefund: '退货是否退手续费',
    refundPeriod: '退货期限',
    refundNumberLimit: '退货次数限制'
  },
  merchantReview: {
    key: '修改key',
    after: '修改之后',
    before: '修改之前',
    name: '审核模块名称',
    frequency: '审核次数',
    progress: '审核进度',
    agree: '同意',
    refuse: '拒绝',
    agreeTitle: '确认判定审核通过?',
    refuseTitle: '确认拒绝审核?',
    remark: '审核备注',
    detailed: '审核详细',
    status: '审核状态',
    reviewModel: '当前使用的审核模块',
    reviewModelRemark: '模块说明',
    nowReviewOpera: '当前审核所属操作员',
    nowReviewRole: '当前审核所属角色'
  },
  payment: {
    startObserved: '交易监控模式',
    closeObserver: '关闭监控',
    getResults: '获取交易结果',
    sendTradeInfoAgain: '再次发送交易通知',
    payment: '生成结算信息',
    viewSettle: '查看结算信息',
    auditNumber: '系统流水号',
    serialNumber: '流水号',
    agencyAuditNumber: '下游流水号',
    responseCode: '响应代码',
    responseMsg: '交易响应消息',
    deviceInfo: '设备信息',
    address: '交易地址',
    cancelled: '交易已撤销',
    refunded: '交易全额退货',
    refundedPart: '交易部分退货'
  },
  paymentRoute: {
    id: '路由id',
    key: '规则key值',
    operator: '比较操作符',
    value: '规则值',
    default: '匹配数据的第一个',
    loadBalance: '匹配数据进行负载均衡',
    random: '随机选择',
    fixed: '固定一个商户',
    fixedBalance: '固定商户进行负载均衡',
    fixedRandom: '固定商户中随机',
    merchantNoSpecify: '指定商户号'
  },
  resource: {
    path: '资源路径',
    post: '新增',
    put: '编辑',
    delete: '删除',
    patch: '修改状态',
    get: '搜索',
    title: '资源配置',
    uri: '资源URI',
    platform: '资源平台',
    business: '业务平台',
    core: '交易平台',
    method: '方法类型'
  },
  settle: {
    auditNumber: '出款流水号',
    paymentTradeRecord: '交易流水号',
    recordAuditNumber: '出款记录流水号',
    goToPaymentTradeTitle: '交易查询信息',
    paymentTime: '支付时间',
    totalAmount: '总交易金额',
    realSettleAmount: '真实出款金额',
    settleHandFee: '全部手续费',
    settleAmount: '结算金额',
    settleMethod: '结算方法',
    status: '结算状态',
    d0Settle: 'D0出款',
    t1Settle: 'T1 结算',
    childSettle: '下级自主结算',
    batchNumber: '出款批次号',
    channelSettleMethod: '通道清算方式',
    channelFlag: '出款通道',
    totalFee: '全部手续费',
    settleAccount: '结算账户信息',
    settleCycle: '结算周期',
    perform: '执行出款',
    mandatory: '强制执行出款',
    submit: '提交出款',
    del: '删除出款',
    paymentSettleDetails: '任务明细',
    paymentTradeDetails: '出款明细',
  },
  settleTask: {
    agency: '机构',
    agencyPath: '本级与下级机构',
    screeningTitle: '筛选',
    processTitle: '处理信息',
    channelFlag: '交易通道',
    settleChannelFlag: '结算通道',
    processMode: '处理方式',
    merged: '是否合并出款',
    startTradeAt: '交易开始时间',
    endTradeAt: '交易结束时间',
    remark: '请输入自定义文件名',
    fileName: '文件名',
    complete: '任务处理成功',
    wait: '等待处理',
    deleted: '已作废'
  },
  settleDetails: {
    editPaymentLineNumber: '修改联行号',
    removeDetail: '移除明细'
  },
  settleTradeDetails: {
    removeTradeDetails: '移除出款明细',
    download: '出款明细下载',
    totalAmount: '总交易金额',
    totalSettleAmount: '总结算金额',
    totalFee: '总手续费',
    totalRealSettleAmount: '总的实际结算金额',
    taskId: '批次号',
    togetherSuccess: '一键成功',
    togetherFailure: '一键失败'
  },
  settleReconciliationTask: {
    process: '当前进程',
    createAt: '对账日期',
    loadPaymentRecord: '加载交易记录',
    channelCompare: '通道交易对比',
    systemCompare: '系统交易对比',
    compare: '交易比对',
    stages: '任务阶段'
  },
  settleCheckMistake: {
    systemExist: '系统有，通道无',
    channelExist: '通道有，系统无',
    result: '结果'
  },
  systemConfig: {
    id: '系统配置id',
    value: '系统配置值',
    merchantReview: '商户审核流程',
    localeRegion: '境内地区码',
    ownerBankIssuerNo: '本行发卡行代码'
  },
  systemOperator: {
    name: '操作员名称',
    toRoles: '所属角色',
    agency: '操作员所属机构',
    id: '操作员ID',
    userId: '用户名',
    roles: '操作员拥有的角色'
  },
  systemProcess: {
    processTitle: '审核配置',
    id: '流程ID',
    name: '审核名称',
    roleId: '审核角色',
    userId: '审核用户',
    describe: '审核说明',
    tradeAt: '交易日期'
  },
  role: {
    path: '资源路径',
    model: '资源',
    title: '权限配置',
    name: '角色名称',
    id: '角色id'
  },
  riskControl: {
    paymentLimits: {
      singleMax: '单笔最大限额',
      singleMin: '单笔最低限额',
      day: '单日限额',
      month: '单月限额',
      describe: '描述'
    }

  },
  rateTemplate: {
    name: '模版名称',
    costInfo: '基本结算',
    posCostInfo: 'pos结算'
  },
  cushionQuotManagement: {
    identity: '垫资对象标识',
    agency: '机构',
    merchant: '商户',
    totalAmount: '总垫资额度',
    businessTime: '垫资时间管理',
    businessTimeOpen: '垫资开始时间',
    businessTimeClose: '垫资结束时间',
    id: '透支额度配置ID',
    type: '垫资对象类型',
    businessType: '业务类型'
  }
};

export const menu = {
  dashboard: '仪表盘',

  channel: '通道管理',
  channelConfig: '通道参数配置',
  channelBusiness: '通道业务管理',
  channelBusinessCreate: '新增通道业务',
  channelBusinessUpdate: '更新通道业务',
  channelMerchant: '通道商户管理',
  channelMerchantCreate: '新增通道商户',
  channelMerchantUpdate: '更新通道商户',
  channelMerchantBusiness: '通道商户业务管理',
  channelMerchantBusinessCreate: '新增通道商户业务',
  channelMerchantBusinessUpdate: '更新通道商户业务',

  agency: '机构管理',
  agencyCreate: '新增机构',
  agencyUpdate: '更新机构',
  agencyBusiness: '机构业务管理',
  agencyBusinessCreate: '新增机构业务',
  agencyBusinessUpdate: '更新机构业务',
  agencyConfig: '机构参数配置',
  agencyProfit: '机构分润管理',

  merchant: '商户管理',
  merchantCreate: '新增商户',
  merchantUpdate: '更新商户',
  merchantBusiness: '商户业务管理',
  merchantBusinessCreate: '新增商户业务',
  merchantBusinessUpdate: '更新商户业务',
  merchantReview: '商户审核',
  merchantBusinessReview: '商户业务审核',
  merchantTemplate: '商户模版管理',

  config: '参数配置',
  settlement: '清分清算',
  settleTask: '出款任务',
  settleDetails: '任务明细',
  settleTradeDetails: '出款明细',
  settleTaskCreate: '新增出款任务',
  settlePayment: '出款管理',
  settleCheckMistake: '查错管理',
  settleReconciliationTask: '对账任务管理',
  settleReconciliationTaskCreate: '新增对账任务',
  settleReconciliationTaskUpdate: '更新对账任务',

  paymentTrade: '交易管理',
  paymentRoute: '交易路由管理',
  paymentRouteCreate: '新增交易路由',
  paymentRouteUpdate: '更新交易路由',

  template: '模版管理',
  rateTemplate: '费率模版管理',
  rateTemplateCreate: '创建费率模版',
  rateTemplateUpdate: '修改费率模版',

  system: '系统管理',
  systemRole: '角色管理',
  systemOperator: '操作员管理',
  systemOperatorCreate: '新增操作员',
  systemRoleCreate: '新增角色信息',
  systemRoleUpdate: '更新角色信息',
  systemClient: '客户端管理',
  systemClientCreate: '新增客户端',
  systemResource: '资源管理',
  systemResourceCreate: '更新资源',
  systemProcess: '审核模版',
  systemProcessCreate: '新增审核过程',
  systemProcessUpdate: '更新审核过程',

  profile: '我的个人信息',

  riskControl: '风控管理',
  controlMerchantLimits: '商户限额管理',
  controlMerchantLimitsCreate: '新增商户限额',
  controlMerchantLimitsUpdate: '编辑商户限额',
  controlMerchantLimitsDetail: '商户限额详情',
  cushionQuotManagement: '垫资管理',
  cushionQuotManagementCreate: '新增垫资管理',
  cushionQuotManagementUpdate: '编辑垫资管理',
  padBusiness: '查看垫资详情'
};

export const errorMsg = {
  notAgenciesTip: '未绑定机构，无法下一步操作!'
};

export const resErrMsg = {
  UNKNOWN: '我也不知道发生了什么:(',
  '300': '请求服务器失败 :(',
  '0000': '请求处理成功',
  '1000': '用户未经认证',
  '1001': '授权不可用',
  '1002': '无效凭证',
  '1103': '用户已经存在',
  '1104': '用户不存在',
  '3000': '一个未知错误',
  '3001': '无效参数',
  '3002': '检查超时',
  '3003': '资源已经存在',
  '3004': '资源不存在',
  '3005': '资源不可用',
  '3006': '您没有权限访问',
  '3007': '重复操作',
  '3008': '输入的值小于最低值',
  '3009': '输入的值大于最大值',
  '3010': '输入的值不等于预期值',
  '3011': '无效的签名',
  '3800': '不能给自己添加业务',
  '3100': '请求方法不支持',
  '3101': '不支持请求方法',
  '3102': 'POS 交易异常',
  '3200': '用户自定义消息',
  '3201': '持卡人信息不正确',
  '3202': '不支持的银行卡',
  '3203': '信用卡信息不正确',
  '3204': '同名信息错误',
  '3300': '无效的openId',
  '3301': 'appId和openId不匹配',
  agency: {
    '2003': '机构已经存在',
    '2004': '机构不存在',
    '2005': '机构不可用',
    '3003': '机构商户业务已存在',
    '3004': '机构不存在',
    '3800': '不能给自己新增业务'
  },
  agencyBusiness: {
    '2013': '机构业务已经存在',
    '2014': '机构业务不存在',
    '2015': '机构业务不可用',
    '2016': '机构与通道业务费率信息倒挂或类型不匹配'
  },
  channelMerchant: {
    '3000': '新增失败，该通道商户已经存在',
    '3003': '业务已经存在，请不要重复添加',
    '3004': '要修改商户业务不存在'
  },
  channelMerchantBusiness: {
    '1994': '通道业务不存在',
    '1995': '通道业务不可以',
  },
  login: {
    '3002': '验证码过期、不正确',
    '3003': '机构已绑定该操作员，不能重复绑定',
    '3004': '机构代码不存在'
  },
  merchant: {
    '2015': '机构不存在业务',
    '2013': '商户已经存在',
    '2103': '商户已经存在',
    '2104': '商户不存在',
    '3003': '请求错误，该商户正在审核中!',
    '3004': '审核流程配置错误',
    '3008': '月限额不能小于日限额',
    '3202': '不支持的卡片类型或发卡行'
  },
  merchantBusiness: {
    '2103': '改业务已存在',
    '2207': '费率存在倒挂',
    '2208': '费率类型与上级费率类型不匹配',
    '3003': '请求错误，该商户或业务正在审核中!',
  },
  paymentSettle: {
    '3003': '资源不存在'
  },
  settleTask: {
    '3800': '当前状态不允许提交出款'
  },
  settleDetails: {
    '3800': '当前状态不允许移除明细'
  },
  settleTradeDetails: {
    '3800': '当前状态不允许操作'
  },
  system: {
    '2004': '机构不存在',
    '3000': '单用户系统创建Client失败',
    '3003': '角色或操作员已经存在',
    '3004': '角色不存在',
  },
  systemRole: {
    '3000': '角色已存在',
    '3800': '不能删除系统内置角色'
  }
};
