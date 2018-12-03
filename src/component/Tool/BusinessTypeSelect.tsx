/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/25
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { Select } from '@sitb/wbs/Select';
import hasPermission from '@sitb/wbs/utils/hasPermission';
import { message } from 'antd';
import { SelectProps } from 'antd/lib/select';

import { getActions } from '../../core/store';
import { BusinessTypeData } from '../../constants/BusinessType';
import { permission } from '../../constants/Permissions';
import { lang, menu } from '../../locale';

export interface Props extends SelectProps {
  /**
   * 获取所有
   */
  getAll?: boolean;
  /**
   * 传递父级机构id，获取父级业务
   */
  parentAgencyId?: string;
}

/**
 * 独立的 businessTypeSelect
 */
@connect(({agencyBusiness}) => ({
  page: agencyBusiness.page
}))
export class BusinessTypeSelect extends React.Component<any> {

  componentWillMount() {
    // 权限校验
    if (hasPermission(permission.agencyBusiness.query)) {
      const {parentAgencyId} = this.props;
      // parentAgencyId
      if (parentAgencyId) {
        // 每次拿最新的上级机构业务
        getActions().agencyBusiness.startQuery({
          id: parentAgencyId
        });
      }
    } else {
      message.warning(lang.permissionError(menu.agencyBusiness));
    }
  }

  /**
   * 过滤业务类型
   * @param businesses
   * @returns {any}
   */
  filterBusiness(businesses) {
    // 过滤掉有退款、退货、撤销、冲正类型
    let checkString = ['REFUND', 'CANCEL', 'REVSAL'];
    // 对象json 已经删除了需要过滤的字段
    if (Array.isArray(businesses)) {
      return businesses.filter(business => !checkString.some(string => business.code.search(string) !== -1));
    }
    return businesses;
  }

  /**
   * 获取businessList
   * @returns {any}
   */
  getBusinessTypeOptions() {
    const {page, getAll, parentAgencyId} = this.props;
    let businessOptions: any = [];
    // 如果为0展示所有
    if (getAll) {
      businessOptions = BusinessTypeData
    } else if (parentAgencyId) {
      page.content.forEach(business => {
        businessOptions.push({
          code: business.businessType,
          value: BusinessTypeData[business.businessType]
        });
      });
    }
    return this.filterBusiness(businessOptions);
  }

  render() {
    const {page, getAll, parentAgencyId, ...props} = this.props;
    return (
      <Select options={this.getBusinessTypeOptions()}
              style={{width: '100%'}}
              placeholder="选择业务"
              getValue={({code}) => `${code}`}
              getLabel={({value}) => `${value}`}
              {...props}
      />
    );
  }
}
