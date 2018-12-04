/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
function create<T extends { [key: string]: string }>(type: string, actions: T): T {
  const result: any = {};
  Object.keys(actions).forEach(key => result[key] = `cashier_application_types@${type}@${key}`);
  return result;
}

// 机构
export const agency = create('agency', {
  startQuery: '',
  queryComplete: '',
  startUpdate: '',
  updateComplete: '',
  startStatus: '',
  statusComplete: '',
  openModal: '',
  startAgencyController: '',
  agencyControllerComplete: ''
});

// 通道商户业务
export const agencyBusiness = create('agency-business', {
  startQuery: '',
  queryComplete: '',
  startUpdate: '',
  updateComplete: '',
  startStatus: '',
  statusComplete: '',
  startDel: '',
  delComplete: ''
});

// 机构参数配置
export const agencyConfig = create('agency-config', {
  startQuery: '',
  queryComplete: '',
  startUpdate: '',
  updateComplete: ''
});


// 机构分润
export const agencyProfit = create('agency-profit', {
  startQuery: '',
  queryComplete: ''
});

// 通道
export const channel = create('channel', {
  startQuery: '',
  queryComplete: '',
  startUpdate: '',
  updateComplete: '',
  /**
   * 请求通道标识
   */
  startChannels: '',
  channelsComplete: ''
});

// 通道业务
export const channelBusiness = create('channel-business', {
  startQuery: '',
  queryComplete: '',
  startUpdate: '',
  updateComplete: '',
  startStatus: '',
  statusComplete: ''
});

// 通道参数配置
export const channelConfig = create('channel-config', {
  startQuery: '',
  queryComplete: '',
  startUpdate: '',
  updateComplete: ''
});

// 通道商户
export const channelMerchant = create('channel-merchant', {
  startQuery: '',
  queryComplete: '',
  startUpdate: '',
  updateComplete: ''
});
// 通道商户业务
export const channelMerchantBusiness = create('channel-merchant-business', {
  startQuery: '',
  queryComplete: '',
  startUpdate: '',
  updateComplete: '',
  startStatus: '',
  statusComplete: '',
  startDel: '',
  delComplete: ''
});

// 商户
export const merchant = create('merchant', {
  openModal: '',
  startQuery: '',
  queryComplete: '',
  startPersist: '',
  persistComplete: '',
  startDel: '',
  delComplete: '',
  startStatus: '',
  statusComplete: '',
  changeDescribe: '',
  /**
   * 商户统计
   */
  startMerchantWeekNew: '',
  merchantWeekNewComplete: '',
  /**
   * 更新密钥
   */
  startUploadPublicKey: '',
  uploadPublicKeyComplete: ''
});

// 商户业务
export const merchantBusiness = create('merchant-business', {
  startQuery: '',
  queryComplete: '',
  startUpdate: '',
  updateComplete: '',
  startStatus: '',
  statusComplete: '',
  startDel: '',
  delComplete: ''
});

// 商户审核
export const merchantReview = create('merchant-review', {
  /**
   * 获取商户正在审核状态
   */
  startQueryWait: '',
  queryWaitComplete: '',
  /**
   * 审核ok 失败
   */
  startQueryOk: '',
  queryOkComplete: '',
  /**
   * 审核
   */
  startCheckReview: '',
  checkReviewComplete: '',
  /**
   * 抽屉开关
   */
  drawerSwitch: ''
});

// 商户业务审核
export const merchantBusinessReview = create('merchant-business-review', {
  /**
   * 获取商户正在审核状态
   */
  startQueryWait: '',
  queryWaitComplete: '',
  /**
   * 审核ok 失败
   */
  startQueryOk: '',
  queryOkComplete: '',
  /**
   * 审核
   */
  startCheckReview: '',
  checkReviewComplete: '',
  /**
   * 抽屉开关
   */
  drawerSwitch: ''
});

// 商户模版
export const merchantTemplate = create('merchant-template', {
  startQuery: '',
  queryComplete: ''
});

export const login = create('login', {
  startSend: '',
  sendComplete: '',
  startBound: '',
  boundComplete: ''
});

// 路由跳转
export const navigator = create('navigator', {
  navigate: '',
  back: '',
  replace: '',
  reset: '',
  delRoute: ''
});

// 交易管理
export const paymentTrade = create('payment-trade', {
  startQuery: '',
  queryComplete: '',
  startDown: '',
  downComplete: '',
  startObserved: '',
  observedComplete: '',
  /**
   * 获取交易结果
   */
  startGetResults: '',
  getResultsComplete: '',
  /**
   * 重发交易通知
   */
  startSendNotice: '',
  sendNoticeComplete: '',
  /**
   * 生成结算信息
   */
  startCreateSettle: '',
  createSelectComplete: '',
  /**
   * 搜索統計信息
   */
  searchStats: '',
  searchStatsComplete: ''
});

// 交易路由
export const paymentRoute = create('payment-route', {
  startQuery: '',
  queryComplete: '',
  startUpdate: '',
  updateComplete: '',
  startDel: '',
  delComplete: ''
});

// 请求权限
export const permissions = create('permissions', {
  startQuery: '',
  queryComplete: ''
});

// 结算信息管理
export const paymentSettle = create('payment-settle', {
  startQuery: '',
  queryComplete: '',
  startDown: '',
  downComplete: '',
  startPerform: '',
  performComplete: ''
});

// 清分清算出款
export const settlePayment = create('settle-payment', {
  startQuery: '',
  queryComplete: '',
  startDown: '',
  downComplete: '',
  startPerform: '',
  performComplete: ''
});

// 出款任务
export const settleTask = create('settle-task', {
  startQuery: '',
  queryComplete: '',
  startDown: '',
  downComplete: '',
  startUpdate: '',
  updateComplete: '',
  /**
   * 提交、删除出款
   */
  startGather: '',
  gatherComplete: '',
  startDel: '',
  delComplete: ''
});

// 出款明细
export const settleDetails = create('settle-details', {
  startQuery: '',
  queryComplete: '',
  /**
   * 移除明细
   */
  startRemoveDetail: '',
  removeDetailComplete: ''
});

// 出款交易明细
export const settleTradeDetails = create('settle-trade-details', {
  startQuery: '',
  queryComplete: '',
  /**
   * 移除、回填、修改联行号公用actionType
   */
  startGather: '',
  gatherComplete: '',
});

// 清算查错
export const settleCheckMistake = create('settle-check-mistake', {
  startQuery: '',
  queryComplete: ''
});

// 对账任务
export const settleReconciliationTask = create('settle-reconciliation-task', {
  startQuery: '',
  queryComplete: '',
  startUpdate: '',
  updateComplete: '',
  /**
   * 发起加载交易、系统交易、通道交易对账
   */
  startStageTask: '',
  stageTaskComplete: ''
});

export const session = create('session', {
  /**
   * 获取当前用户的信息
   */
  startProfile: '',
  profileComplete: '',
  /**
   * 登录机构
   */
  startLoginAgency: '',
  loginAgencyComplete: '',
  /**
   * 存储用户token
   */
  startAccessToken: '',
  accessTokenComplete: '',
  /**
   * 存储机构id
   */
  startAgencyId: '',
  agencyIdComplete: '',
  /**
   * 获取子机构信息
   */
  getChildrenAgency: '',
  getChildrenAgencyComplete: '',
  /**
   * 获取权限
   */
  getResources: '',
  getResourcesComplete: '',
  /**
   * 退出登录
   */
  startEntityExit: '',
  entityExitComplete: ''
});

// 个人信息模块
export const profile = create('profile', {
  /**
   * 获取审核列表
   */
  startQueryReview: '',
  queryReviewComplete: '',
  /**
   * 审核
   */
  startCheckReview: '',
  checkReviewComplete: '',
  /**
   * 上传机构密钥
   */
  updateAgencyKey: '',
  updateAgencyKeyComplete: ''
});

// 资源
export const systemResource = create('system-resource', {
  startQuery: '',
  queryComplete: '',
  startUpdate: '',
  updateComplete: '',
  startDel: '',
  delComplete: ''
});
// 角色
export const systemRole = create('system-role', {
  startQuery: '',
  queryComplete: '',
  startUpdate: '',
  updateComplete: '',
  resourcesChange: '',
  pathChange: '',
  del: '',
  delComplete: ''
});
// 客户端
export const systemClient = create('system-client', {
  startQuery: '',
  queryComplete: '',
  startUpdate: '',
  updateComplete: '',
  del: '',
  delComplete: ''
});

// 系统参数配置
export const systemConfig = create('system-config', {
  query: '',
  queryComplete: '',
  create: '',
  createComplete: ''
});

// 系统操作员
export const systemOperator = create('systemOperator', {
  startQuery: '',
  queryComplete: '',
  startUpdate: '',
  updateComplete: '',
  /**
   * query user
   */
  startQueryUser: '',
  queryUserComplete: ''
});

// 系统审核
export const systemProcess = create('system-process', {
  startQuery: '',
  queryComplete: '',
  startUpdate: '',
  updateComplete: '',
  startDel: '',
  delComplete: ''
});

// 搜索user
export const user = create('user', {
  startQuery: '',
  queryComplete: ''
});


// 风控管理 商户限额
export const controlMerchantLimits = create('control-merchant-limits', {
  startQuery: '',
  queryComplete: '',
  startUpdate: '',
  updateComplete: '',
  startStatus: '',
  statusComplete: '',
  startDel: '',
  delComplete: '',
  startPaymentLimitsController: '',
  paymentLimitsComplete: ''
});

// 费率模版管理
export const rateTemplate = create('rate-template', {
  startQuery: '',
  queryComplete: '',
  startUpdate: '',
  updateComplete: '',
  startStatus: '',
  statusComplete: '',
  startDel: '',
  delComplete: ''
});

//垫资额度管理
export const cushionQuotManagement = create('cushion', {
  startQuery: '',
  queryComplete: '',
  startDel: '',
  delComplete: '',
  startUpdate: '',
  updateComplete: ''
});
