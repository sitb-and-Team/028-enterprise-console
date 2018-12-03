/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/8/17
 */
import * as React from 'react';
import { Select } from '@sitb/wbs/Select';

// 切换染机构下拉选择列表
export const switchAgencySelect = (props) => {
  const {options, onChange, value, ...other} = props;
  return (
    <Select options={options}
            onChange={onChange}
            value={value}
            style={{width: '100%'}}
            placeholder="切换机构"
            getValue={({agency}: any) => `${agency.id}`}
            getLabel={({agency}: any) => `${agency.name}-${agency.code}` || `${agency}`}
            {...other}
    />);
};
