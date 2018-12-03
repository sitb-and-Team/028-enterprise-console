/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/9
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { autoBind } from '@sitb/wbs/autoBind';
import { Form as ANTDForm } from 'antd';
import { getActions } from '../../core/store';
import { merchantReviewColumns } from './columns';
import { lang } from '../../locale';
import {
  mappingObjectGather,
  mappingObjectKey,
  setValueGather,
  setValueKey
} from './merchantBusinessReviewGridViewConfig';
import { ReviewComponent } from '../../component/HocComponent/ReviewComponent';
import { addMerchantBusinessBasic, addMerchantBusinessCost, addMerchantBusinessPos } from './expandedRow';
import { permission } from '../../constants/Permissions';

// 检查列表
let checkKeyWordList: any = ['id', 'actionDate', 'merchantName', 'merchantNo'];

@autoBind
export class Component extends React.Component<any, any> {

  render() {
    const {okProcessing, waitProcessing, okPage, waitPage, drawerVisible, form, waitSearchParams, okSearchParams} = this.props;
    const beforeConfig: any = [{
      config: addMerchantBusinessBasic,
      title: lang.basicInfo
    }, {
      config: addMerchantBusinessCost,
      title: lang.rateTemplate.costInfo
    }, {
      config: addMerchantBusinessPos,
      title: lang.rateTemplate.posCostInfo
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
                       langObject={lang.merchantBusiness}
                       permission={permission.merchantBusinessReview.update}
                       drawerSwitch={(status) => getActions().merchantBusinessReview.drawerSwitch(status)}
                       startCheckReview={(reviewData) => getActions().merchantBusinessReview.startCheckReview(reviewData)}
                       startQueryWait={(newParams) => getActions().merchantBusinessReview.startQueryWait(newParams)}
                       startQueryOk={(newParams) => getActions().merchantBusinessReview.startQueryOk(newParams)}
      />
    );
  }
}

export const MerchantBusinessReview = connect(({merchantBusinessReview, systemRole, systemOperator}) => ({
  okProcessing: merchantBusinessReview.okProcessing,
  waitProcessing: merchantBusinessReview.waitProcessing,
  drawerVisible: merchantBusinessReview.drawerVisible,
  waitSearchParams: merchantBusinessReview.waitSearchParams,
  okSearchParams: merchantBusinessReview.okSearchParams,
  okPage: merchantBusinessReview.okPage,
  waitPage: merchantBusinessReview.waitPage,
  selectRole: systemRole.selectRole,
  selectOperator: systemOperator.selectOperator
}))(ANTDForm.create()(Component));
