/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/9
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import { Form as ANTDForm } from 'antd';
import { getActions } from '../../core/store';
import { merchantReviewColumns } from './columns';
import { lang } from '../../locale';
import { mappingObjectGather, mappingObjectKey, setValueGather, setValueKey } from './merchantReviewGridViewConfig';
import { ReviewComponent } from '../../component/HocComponent/ReviewComponent';
import {
  addMerchantBasicShow,
  addMerchantFeeSettleAccount,
  addMerchantLegalPerson,
  addMerchantLinkman,
  addMerchantSettleAccount
} from './expandedRow';
import { permission } from '../../constants/Permissions';

// 检查列表
let checkKeyWordList: any = ['id', 'createAt', 'updateAt', 'key', 'businesses', 'agency', 'linkman.identities', 'legalPerson.identities'];

@autoBind
class Component extends React.Component<any, any> {

  render() {
    const {okProcessing, waitProcessing, okPage, waitPage, drawerVisible, form, waitSearchParams, okSearchParams} = this.props;
    const beforeConfig = [{
      config: addMerchantBasicShow,
      title: lang.basicInfo
    }, {
      config: addMerchantLegalPerson,
      title: lang.agency.legalInfo
    }, {
      config: addMerchantLinkman,
      title: lang.agency.linkmanInfo
    }, {
      config: addMerchantFeeSettleAccount,
      title: lang.merchant.feeSettleAccountString
    }, {
      config: addMerchantSettleAccount,
      title: lang.costInfo
    }];
    return (
      <ReviewComponent okProcessing={okProcessing}
                       waitProcessing={waitProcessing}
                       okPage={okPage}
                       waitPage={waitPage}
                       waitSearchParams={waitSearchParams}
                       okSearchParams={okSearchParams}
                       drawerVisible={drawerVisible}
                       form={form}
                       columns={merchantReviewColumns}
                       beforeConfig={beforeConfig}
                       mappingObjectKey={mappingObjectKey}
                       mappingObjectGather={mappingObjectGather}
                       setValueKey={setValueKey}
                       setValueGather={setValueGather}
                       checkKeyWordList={checkKeyWordList}
                       langObject={lang.merchant}
                       permission={permission.merchantReView.update}
                       drawerSwitch={(status) => getActions().merchantReview.drawerSwitch(status)}
                       startCheckReview={(reviewData) => getActions().merchantReview.startCheckReview(reviewData)}
                       startQueryWait={(newParams) => getActions().merchantReview.startQueryWait(newParams)}
                       startQueryOk={(newParams) => getActions().merchantReview.startQueryOk(newParams)}
      />
    );
  }
}

export const MerchantReview = connect(({merchantReview, systemRole, systemOperator}) => ({
  okProcessing: merchantReview.okProcessing,
  waitProcessing: merchantReview.waitProcessing,
  drawerVisible: merchantReview.drawerVisible,
  waitSearchParams: merchantReview.waitSearchParams,
  okSearchParams: merchantReview.okSearchParams,
  okPage: merchantReview.okPage,
  waitPage: merchantReview.waitPage,
  selectRole: systemRole.selectRole,
  selectOperator: systemOperator.selectOperator
}))(ANTDForm.create()(Component));
