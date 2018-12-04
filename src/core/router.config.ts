import { Dashboard } from '../container/Dashboard';

import { MerchantQuery } from '../container/Merchant/Merchant';
import { MerchantPersist } from '../container/Merchant/PersistMerchant';
import { MerchantBusiness } from '../container/Merchant/MerchantBusiness';
import { MerchantBusinessPersist } from '../container/Merchant/PersistMerchantBusiness';
import { MerchantReview } from '../container/Merchant/MerchantReview';
import { MerchantBusinessReview } from '../container/Merchant/MerchantBusinessReview';

import { PaymentTrade } from '../container/Payment/PaymentTrade';
import { PaymentRoute } from '../container/Payment/PaymentRoute';
import { PaymentRoutePersist } from '../container/Payment/PaymentRoutePersist';

import { SettlePayment } from '../container/Settle/SettlePayment';
import { SettleCheckMistake } from '../container/Settle/SettleCheckMistake';
import { SettleReconciliationTask } from '../container/Settle/SettleReconciliationTask';
import { SettleReconciliationTaskPersist } from '../container/Settle/SettleReconciliationTaskPersist';
import { SettleTask } from '../container/Settle/SettleTask';
import { SettleDetails } from '../container/Settle/SettleDetails';
import { SettleTradeDetails } from '../container/Settle/SettleTradeDetails';
import { PersistSettleTask } from '../container/Settle/PersistSettleTask';

import { SystemConfig } from '../container/System/SystemConfig';
import { SystemRole } from '../container/System/SystemRole';
import { PersistSystemRole } from '../container/System/PersistSystemRole';
import { SystemOperator } from '../container/System/SystemOperator';
import { systemOperatorPersist } from '../container/System/PersistSystemOperator';
import { SystemResource } from '../container/System/SystemResource';
import { SystemResourceCreate } from '../container/System/SystemResourceCreate';
import { SystemClient } from '../container/System/SystemClient';
import { SystemClientPersist } from '../container/System/SystemClientPersist';
import { SystemProcess } from '../container/System/SystemProcess';
import { SystemProcessPersist } from '../container/System/PersistSystemProcess';

import { menu } from '../locale';
import { ProfileIndex } from '../container/Profile';



// 路由path
export const routerPath = {
  dashboard: '/dashboard',

  merchant: '/merchant',
  merchantPersist: '/merchant/persist/:type',
  merchantCreate: '/merchant/persist/create',
  merchantUpdate: '/merchant/persist/update',
  merchantBusiness: '/merchant/business',
  merchantBusinessPersist: '/merchant/business/persist/:type',
  merchantBusinessCreate: '/merchant/business/persist/create',
  merchantBusinessUpdate: '/merchant/business/persist/update',
  merchantReview: '/merchant-review',
  merchantBusinessReview: '/merchant-business-review',
  merchantTemplate: '/merchant-template',

  payment: '/payment',
  paymentTrade: '/payment-trade',
  paymentRoute: '/payment-route',
  paymentRoutePersist: '/payment-route/persist/:type',
  paymentRouteCreate: '/payment-route/persist/create',
  paymentRouteUpdate: '/payment-route/persist/update',

  settlePayment: '/settle-payment',
  settleTask: '/settle-task',
  settleDetails: '/settle-task/settle-Details',
  settleTradeDetails: '/settle-task/settle-trade-Details',
  settleTaskPersist: '/settle-task/persist/:type',
  settleTaskCreate: '/settle-task/persist/create',
  settleCheckMistake: '/settle-reconciliation-task/checkMistake',
  settleReconciliationTask: '/settle-reconciliation-task',
  settleReconciliationTaskPersist: '/settle-reconciliation-task/persist/:type',
  settleReconciliationTaskCreate: '/settle-reconciliation-task/persist/create',
  settleReconciliationTaskUpdate: '/settle-reconciliation-task/persist/update',

  rateTemplate: '/template-rate',
  rateTemplatePersist: '/template-rate/persist/:type',
  rateTemplateCreate: '/template-rate/persist/create',
  rateTemplateUpdate: '/template-rate/persist/update',

  system: '/system',
  systemConfig: '/system-config',
  systemResource: '/system-resource',
  systemResourceCreate: '/system-resource/create',
  systemRole: '/system-role',
  systemRolePersist: '/system-role/persist/:type',
  systemRoleCreate: '/system-role/persist/create',
  systemRoleUpdate: '/system-role/persist/update',
  systemClient: '/system-client',
  systemClientPersist: '/system-client/persist/:type',
  systemClientCreate: '/system-client/persist/create',
  systemOperator: '/system-operator',
  systemOperatorPersist: '/system-operator/persist/:type',
  systemOperatorCreate: '/system-operator/persist/create',
  systemProcess: '/system-process',
  systemProcessPersist: '/system-process/persist/:type',
  systemProcessCreate: '/system-process/persist/create',
  systemProcessUpdate: '/system-process/persist/update',

  profile: '/profile',

  riskControl: '/RiskControl',
  controlMerchantLimits: '/controlMerchantLimits',
  PersistControlMerchantLimits: '/controlMerchantLimits/persist/:type',
  controlMerchantLimitsCreate: '/controlMerchantLimits/persist/create',
  controlMerchantLimitsUpdate: '/controlMerchantLimits/persist/update',
  controlMerchantLimitsDetail: '/controlMerchantLimits/detail',

  cushionQuotManagement: '/cushionQuotManagement',
  cushionQuotManagementPersist: '/cushionQuotManagement/persist/:type',
  cushionQuotManagementCreate: '/cushionQuotManagement/persist/create',
  cushionQuotManagementUpdate: '/cushionQuotManagement/persist/update',

};

// 面包屑 路由配置
export const breadcrumbNameMap = {

  [routerPath.merchant]: menu.merchant,
  [routerPath.merchantCreate]: menu.merchantCreate,
  [routerPath.merchantUpdate]: menu.merchantUpdate,
  [routerPath.merchantBusiness]: menu.merchantBusiness,
  [routerPath.merchantBusinessCreate]: menu.merchantBusinessCreate,
  [routerPath.merchantBusinessUpdate]: menu.merchantBusinessUpdate,
  [routerPath.merchantReview]: menu.merchantReview,
  [routerPath.merchantBusinessReview]: menu.merchantBusinessReview,
  [routerPath.merchantTemplate]: menu.merchantTemplate,

  [routerPath.paymentTrade]: menu.paymentTrade,
  [routerPath.paymentRoute]: menu.paymentRoute,
  [routerPath.paymentRouteCreate]: menu.paymentRouteCreate,
  [routerPath.paymentRouteUpdate]: menu.paymentRouteUpdate,

  [routerPath.settlePayment]: menu.settlePayment,
  [routerPath.settleTask]: menu.settleTask,
  [routerPath.settleDetails]: menu.settleDetails,
  [routerPath.settleTradeDetails]: menu.settleTradeDetails,
  [routerPath.settleTaskCreate]: menu.settleTaskCreate,
  [routerPath.settleCheckMistake]: menu.settleCheckMistake,
  [routerPath.settleReconciliationTask]: menu.settleReconciliationTask,
  [routerPath.settleReconciliationTaskCreate]: menu.settleReconciliationTaskCreate,
  [routerPath.settleReconciliationTaskUpdate]: menu.settleReconciliationTaskUpdate,

  [routerPath.systemConfig]: menu.config,
  [routerPath.systemOperator]: menu.systemOperator,
  [routerPath.systemOperatorCreate]: menu.systemOperator,
  [routerPath.systemRole]: menu.systemRole,
  [routerPath.systemRoleCreate]: menu.systemRoleCreate,
  [routerPath.systemRoleUpdate]: menu.systemRoleUpdate,
  [routerPath.systemClient]: menu.systemClient,
  [routerPath.systemClientCreate]: menu.systemClientCreate,
  [routerPath.systemResource]: menu.systemResource,
  [routerPath.systemResourceCreate]: menu.systemResourceCreate,
  [routerPath.systemProcess]: menu.systemProcess,
  [routerPath.systemProcessCreate]: menu.systemProcessCreate,
  [routerPath.systemProcessUpdate]: menu.systemProcessUpdate,

  [routerPath.profile]: menu.profile,

  [routerPath.controlMerchantLimits]: menu.controlMerchantLimits,
  [routerPath.controlMerchantLimitsCreate]: menu.controlMerchantLimitsCreate,
  [routerPath.controlMerchantLimitsUpdate]: menu.controlMerchantLimitsUpdate,
  [routerPath.controlMerchantLimitsDetail]: menu.controlMerchantLimitsDetail,
  [routerPath.cushionQuotManagement]: menu.cushionQuotManagement,
  [routerPath.cushionQuotManagementCreate]: menu.cushionQuotManagementCreate,
  [routerPath.cushionQuotManagementUpdate]: menu.cushionQuotManagementUpdate,

};

export default [{
  path: routerPath.dashboard,
  component: Dashboard
}, {
  path: routerPath.merchant,
  component: MerchantQuery
}, {
  path: routerPath.merchantPersist,
  component: MerchantPersist
}, {
  path: routerPath.merchantBusiness,
  component: MerchantBusiness
}, {
  path: routerPath.merchantBusinessPersist,
  component: MerchantBusinessPersist
}, {
  path: routerPath.merchantReview,
  component: MerchantReview
}, {
  path: routerPath.merchantBusinessReview,
  component: MerchantBusinessReview
}, {
  path: routerPath.paymentTrade,
  component: PaymentTrade
}, {
  path: routerPath.paymentRoute,
  component: PaymentRoute
}, {
  path: routerPath.paymentRoutePersist,
  component: PaymentRoutePersist
}, {
  path: routerPath.settlePayment,
  component: SettlePayment
}, {
  path: routerPath.settleTask,
  component: SettleTask
}, {
  path: routerPath.settleDetails,
  component: SettleDetails
}, {
  path: routerPath.settleTradeDetails,
  component: SettleTradeDetails
}, {
  path: routerPath.settleTaskPersist,
  component: PersistSettleTask
}, {
  path: routerPath.settleCheckMistake,
  component: SettleCheckMistake
}, {
  path: routerPath.settleReconciliationTask,
  component: SettleReconciliationTask
}, {
  path: routerPath.settleReconciliationTaskPersist,
  component: SettleReconciliationTaskPersist
}, {
  path: routerPath.systemConfig,
  component: SystemConfig
}, {
  path: routerPath.systemRole,
  component: SystemRole
}, {
  path: routerPath.systemRolePersist,
  component: PersistSystemRole
}, {
  path: routerPath.systemOperator,
  component: SystemOperator
}, {
  path: routerPath.systemOperatorPersist,
  component: systemOperatorPersist
}, {
  path: routerPath.systemResource,
  component: SystemResource
}, {
  path: routerPath.systemResourceCreate,
  component: SystemResourceCreate
}, {
  path: routerPath.systemClient,
  component: SystemClient
}, {
  path: routerPath.systemClientPersist,
  component: SystemClientPersist
}, {
  path: routerPath.systemProcess,
  component: SystemProcess
}, {
  path: routerPath.systemProcessPersist,
  component: SystemProcessPersist
}, {
  path: routerPath.profile,
  component: ProfileIndex
}];
