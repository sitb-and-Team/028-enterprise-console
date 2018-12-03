import * as React from 'react';
import { Card } from 'antd';
import { ColumnType } from '@sitb/wbs/DataGrid/DataGrid';
import { lang } from '../../locale';
import { SettleStatusOptions } from '../../constants/selectObj/SettleStatus';
import { settleCheckMistakeStatusOptions } from '../../constants/selectObj/settleCheckMistakeStatus';
import { SettleCheckMistakeResultOptions } from '../../constants/selectObj/SettleCheckMistakeResult';
import { SeminalSteps } from '../../component/Steps/SeminalSteps';
import { settleReconciliationTaskStatusOptions } from '../../constants/selectObj/settleReconciliationStatus';
import { CheckBox } from '../../component/Form/CheckBox';
import { settleReconciliationTaskProcess } from '../../constants/selectObj/settleReconciliationTaskProcess';
import { MerchantFeeSettleCycleOptions } from '../../constants/selectObj/MerchantFeeSettleCycle';
import { SettleTaskStatusOptions } from '../../constants/selectObj/SettleTaskStatus';
import { SettleProcessingModeOptions } from '../../constants/selectObj/SettleProcessingMode';
import { SettleTaskStageOptions } from '../../constants/selectObj/SettleTaskStage';
import { BusinessTypeData } from '../../constants/BusinessType';
import { SettleTradeDetailStatusOptions } from '../../constants/selectObj/SettleTrandDetailStatus';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/13
 */

// 清算出款columns
export const settlePaymentColumns = [{
  title: lang.merchant.info,
  dataIndex: 'paymentRecord.merchant',
  render: (merchant) => merchant && `${merchant.merchantNo}-${merchant.merchantName}`
}, {
  title: lang.settle.channelFlag,
  dataIndex: 'channelFlag'
}, {
  title: lang.settle.batchNumber,
  dataIndex: 'batchNumber'
}, {
  title: lang.settle.auditNumber,
  dataIndex: 'auditNumber'
}, {
  title: lang.settle.paymentTradeRecord,
  dataIndex: 'paymentRecord.auditNumber'
}, {
  title: lang.settle.totalAmount,
  dataIndex: 'totalAmount',
}, {
  title: lang.settle.settleHandFee,
  dataIndex: 'totalFee'
}, {
  title: lang.settle.realSettleAmount,
  dataIndex: 'realSettleAmount'
}, {
  title: lang.settle.settleAmount,
  dataIndex: 'settleAmount'
}, {
  title: lang.settle.settleMethod,
  dataIndex: 'settleCycle',
  render: settleCycle => settleCycle && MerchantFeeSettleCycleOptions[settleCycle]
}, {
  title: lang.settle.channelSettleMethod,
  dataIndex: 'channelSettleCycle',
  render: channelSettleCycle => channelSettleCycle && MerchantFeeSettleCycleOptions[channelSettleCycle]
}, {
  title: lang.status,
  dataIndex: 'status',
  type: ColumnType.STATUS,
  getBadgeProps: (status) => ({
    text: SettleStatusOptions[status]
  })
}, {
  title: lang.describe,
  dataIndex: 'describe'
}, {
  title: lang.settleAt,
  dataIndex: 'settleAt',
  type: ColumnType.DATE_TIME
}, {
  title: lang.settle.paymentTime,
  dataIndex: 'paymentRecord.paymentAt',
  type: ColumnType.DATE_TIME
}, {
  title: lang.remark,
  dataIndex: 'remark'
}];

/**
 * 过滤 status
 * @param status      当前数据的status
 * @returns {string}  返回settle需要的状态
 */
function filterStatus(status) {
  switch (status) {
    case 'WAIT': {
      return 'wait';
    }
    case 'SUCCESS': {
      return 'finish';
    }
    case 'FAILURE': {
      return 'error';
    }
    default:
      return 'process'
  }
}

/**
 * 判断是否成功
 * @param status      当前状态
 * @returns {boolean}
 */
function isSuccess(status) {
  if (status && status === 'SUCCESS') {
    return false;
  }
  return true;
}

// 结算对账任务columns
export const settleReconciliationTaskColumns = ({handleStageSubmit, handleSaveChannel}) => [{
  title: lang.settleReconciliationTask.stages,
  dataIndex: 'stages',
  render: (stages, record) => {
    if (stages) {
      // 优化字段
      let loadPaymentRecord = settleReconciliationTaskProcess.loadPaymentRecord;
      let channelCompare = settleReconciliationTaskProcess.channelCompare;
      let systemCompare = settleReconciliationTaskProcess.systemCompare;
      // 存放step配置
      const config: any = [];
      // 存放通道名list
      let channelFlagList: Array<string> = [];
      //  存放通道包括状态
      let channelList: any = [];
      // 存放交易生成按钮状态isLoad, isChannel
      let stageStatus: any = {};
      // 判断前一阶段是否成功
      stages.forEach((state: any) => {
        if (state.name === loadPaymentRecord) {
          stageStatus = {
            ...stageStatus,
            isLoad: isSuccess(state.status)
          }
        }
        if (state.name === channelCompare) {
          stageStatus = {
            ...stageStatus,
            isChannel: isSuccess(state.status)
          }
        }
      });

      stages.forEach((state: any) => {
        // 判断是否是通道交易对比，获取通道信息
        if (state.channelStageDetails) {
          state.channelStageDetails.forEach((channel) => {
            // 生成多选框配置的数据
            channelFlagList.push(channel.channelFlag);
            channelList.push(channel);
          });
        }

        // 下面的判断是生成step配置文件的处理
        if (state.name === loadPaymentRecord) {
          config[0] = {
            btnName: '加载交易记录',
            onClick: () => handleStageSubmit(record, loadPaymentRecord),
            status: filterStatus(state.status),
            description: settleReconciliationTaskStatusOptions[state.status]
          };
        }
        if (state.name === channelCompare) {
          config[1] = {
            btnName: '通道交易比对',
            title: (
              <React.Fragment>
                {<p>{'重新发起通道交易对账'}</p>}
                <Card bodyStyle={{paddingTop: 5, paddingBottom: 5}}>
                  {
                    channelList.map((channel, index) => (
                      <p
                        key={index}>{`${channel.channelFlag}: ${settleReconciliationTaskStatusOptions[channel.status]}`}</p>)
                    )
                  }
                </Card>
                <Card>
                  <CheckBox options={channelFlagList}
                            setTitle={lang.notChannel}
                            saveCheckValues={(checks) => handleSaveChannel(checks)}
                  />
                </Card>
              </React.Fragment>),
            onClick: () => handleStageSubmit(record, channelCompare),
            disabled: stageStatus.isLoad,
            status: filterStatus(state.status),
            description: settleReconciliationTaskStatusOptions[state.status]
          };
        }
        if (state.name === systemCompare) {
          config[2] = {
            btnName: '系统交易比对',
            onClick: () => handleStageSubmit(record, systemCompare),
            disabled: stageStatus.isChannel,
            status: filterStatus(state.status),
            description: settleReconciliationTaskStatusOptions[state.status]
          };
        }
      });
      return (
        <SeminalSteps config={config}
                      channelList={channelList}
        />
      )
    }
    return null;
  }
}, {
  title: lang.systemProcess.tradeAt,
  dataIndex: 'paymentStartAt',
  type: ColumnType.DATE
}, {
  title: lang.createAt,
  dataIndex: 'createAt',
  type: ColumnType.DATE_TIME
}];

// 查错columns
export const settleCheckMistakeColumns = [{
  title: lang.channelFlag,
  dataIndex: 'channelFlag'
}, {
  title: lang.payment.auditNumber,
  dataIndex: 'auditNumber'
}, {
  title: lang.channelMerchant.number,
  dataIndex: 'channelAuditNumber'
}, {
  title: lang.status,
  dataIndex: 'status',
  type: ColumnType.STATUS,
  getBadgeProps: (status) => ({
    text: settleCheckMistakeStatusOptions[status]
  })
}, {
  title: lang.settleCheckMistake.result,
  dataIndex: 'result',
  render: result => result && SettleCheckMistakeResultOptions[result]
}, {
  title: lang.paymentAt,
  dataIndex: 'paymentAt',
  type: ColumnType.DATE_TIME
}, {
  title: lang.statementAt,
  dataIndex: 'statementAt',
  type: ColumnType.DATE_TIME
}];

// 出款任务columns
export const settleTaskColumns = [{
  title: lang.channelFlag,
  dataIndex: 'channelFlag'
}, {
  title: lang.agencyCode,
  dataIndex: 'agencyCode'
}, {
  title: lang.agency.path,
  dataIndex: 'agencyPath'
}, {
  title: lang.settleCycle,
  dataIndex: 'settleCycle',
  render: settleCycle => settleCycle && MerchantFeeSettleCycleOptions[settleCycle]
}, {
  title: lang.settleTask.settleChannelFlag,
  dataIndex: 'settleChannelFlag',
}, {
  title: lang.settleTask.processMode,
  dataIndex: 'processMode',
  render: processMode => processMode && SettleProcessingModeOptions[processMode]
}, {
  title: lang.stage,
  dataIndex: 'stage',
  type: ColumnType.STATUS,
  getBadgeProps: (enabled) => ({
    text: SettleTaskStageOptions[enabled]
  })
}, {
  title: lang.status,
  dataIndex: 'status',
  type: ColumnType.STATUS,
  getBadgeProps: (enabled) => ({
    text: SettleTaskStatusOptions[enabled]
  })
}, {
  title: lang.createAt,
  dataIndex: 'createAt',
  type: ColumnType.DATE_TIME
}, {
  title: lang.describe,
  dataIndex: 'describe'
}, {
  title: lang.remark,
  dataIndex: 'remark'
}];


// 任务明细 columns
export const settleDetailsColumns = [{
  title: lang.agency.info,
  dataIndex: 'paymentRecord.agency',
  render: agency => agency && `${agency.code}-${agency.name}`
}, {
  title: lang.merchant.info,
  dataIndex: 'paymentRecord.merchant',
  render: merchant => merchant && `${merchant.merchantNo}-${merchant.merchantName}`
}, {
  title: lang.payment.auditNumber,
  dataIndex: 'paymentRecord.auditNumber'
}, {
  title: lang.businessType,
  dataIndex: 'paymentRecord.businessType',
  render: businessType => businessType && BusinessTypeData[businessType]
}, {
  title: lang.agencyProfit.totalAmount,
  dataIndex: 'paymentRecord.totalAmount'
}, {
  title: lang.describe,
  dataIndex: 'paymentRecord.describe'
}, {
  title: lang.status,
  dataIndex: 'status',
  type: ColumnType.STATUS,
  getBadgeProps: (status) => ({
    text: SettleTaskStatusOptions[status]
  })
}, {
  title: lang.payment.agencyAuditNumber,
  dataIndex: 'paymentRecord.subAuditNumber'
}, {
  title: lang.paymentAt,
  dataIndex: 'paymentRecord.paymentAt',
  type: ColumnType.DATE_TIME
}, {
  title: lang.createAt,
  dataIndex: 'createAt',
  type: ColumnType.DATE_TIME
}];


// 出款明细columns
export const settleTradeDetailsColumns = [{
  title: lang.merchant.info,
  dataIndex: 'merchantName',
  render: (merchantName, data) => merchantName && `${data.merchantNo}-${merchantName}`
}, {
  title: lang.settleTradeDetails.totalAmount,
  dataIndex: 'totalAmount',
}, {
  title: lang.settleTradeDetails.totalSettleAmount,
  dataIndex: 'totalSettleAmount'
}, {
  title: lang.settleTradeDetails.totalFee,
  dataIndex: 'totalFee'
}, {
  title: lang.settleTradeDetails.totalRealSettleAmount,
  dataIndex: 'totalRealSettleAmount'
}, {
  title: lang.status,
  dataIndex: 'status',
  type: ColumnType.STATUS,
  getBadgeProps: (enabled) => ({
    text: SettleTradeDetailStatusOptions[enabled]
  })
}, {
  title: lang.merchant.settleAccount.name,
  dataIndex: 'settleAccount.name'
}, {
  title: lang.merchant.settleAccount.number,
  dataIndex: 'settleAccount.number'
}, {
  title: lang.merchant.settleAccount.bankName,
  dataIndex: 'settleAccount.bankName'
}, {
  title: lang.settleBankNo,
  dataIndex: 'settleAccount.bankNo'
}, {
  title: lang.merchant.legalPerson.idCard.number,
  dataIndex: 'settleAccountId.number'
}];
