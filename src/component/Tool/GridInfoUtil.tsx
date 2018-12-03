/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/8
 */
import * as React from 'react';
import { Col, Icon, Row } from 'antd';
import ObjectPath from 'object-path';

export interface RowItem {
  /**
   * 标题
   */
  label?: string;
  /**
   * 图标type
   */
  icon?: any;
  /**
   * 值
   */
  value?: string | Array<string>;
  /**
   * 需要映射展示的object
   */
  mappingObject?: object;

  /**
   * 手动setValue
   */
  setValue?: (any, dataSource) => void;
  /**
   * 默认值
   */
  defaultValue?: string;
}

export interface InfoProps {
  /**
   * 取值的数据源
   */
  dataResource?: object;
  /**
   * 栅格配置
   */
  row: RowItem;


  layout?: 'stretch' | 'baseline';
  /**
   * 自定义栅格，详细看antd文档
   */
  setCol?: any;
  /**
   * label value栅格，详情看antd文档
   */
  setLabelCol?: any;
  setValueCol?: any;
}

export interface GridInfoProps {
  /**
   * 栅格配置
   */
  rows: Array<RowItem>;

  layout?: 'stretch' | 'baseline';
  /**
   * 自定义栅格，详细看antd文档
   */
  setCol?: any;
  /**
   * label value栅格，详情看antd文档
   */
  setLabelCol?: any;
  setValueCol?: any;
}

/**
 * 根据对象路径取值
 * @param obj   对象
 * @param path  对象path
 * @returns {any}
 */
export function objectPathGet(obj, path) {
  // 设置默认为xx
  let DEFAULT_VALUE: any = '-';
  if (path) {
    // 处理为path 为[]的情况
    path = path.replace(/\[/g, '.');
    path = path.replace(/]/g, '');
    let value = ObjectPath.get(obj, path);
    // value有为0的情况
    if (typeof value === 'number' || typeof value === 'boolean') {
      return `${value}`;
    }
    if (!value) {
      return DEFAULT_VALUE;
    }
    return value;
  }
  return DEFAULT_VALUE;
}

/**
 * 过滤value
 * @param item   整行的object
 * @param dataResource  对象数据
 * @returns {any}
 */
export function filterValue(item: RowItem, dataResource?) {
  let RENDER_VALUE: any = `${item}`;
  // 根据是否传递对象数据，来判断是否过滤操作
  if (dataResource) {
    const {value, mappingObject, setValue, defaultValue} = item;
    // 如果是多组string 拼接
    if (Array.isArray(value)) {
      // 临时数组变量
      let DEFAULT_VALUE: any = [];
      value.forEach(stringPath => {
        DEFAULT_VALUE.push(objectPathGet(dataResource, stringPath));
      });
      RENDER_VALUE = DEFAULT_VALUE.join('-');
    } else {
      // 默认获取path
      RENDER_VALUE = objectPathGet(dataResource, value);
    }

    // 配置默认值
    if (defaultValue) {
      RENDER_VALUE = defaultValue;
    }
    // 对象映射
    if (mappingObject) {
      RENDER_VALUE = mappingObject[RENDER_VALUE]
    }
    // set设置
    if (setValue) {
      RENDER_VALUE = setValue(RENDER_VALUE, dataResource);
    }
  }
  return RENDER_VALUE;
}

/**
 * 分离，渲染item，参数父组件
 * @param rows
 * @param dataResource
 */
function infoUtil({row, setLabelCol, setValueCol, dataResource, layout}: InfoProps) {
  const {label, icon} = row;
  // title 或者icon title
  const itemLabel = icon && (
    <span style={{
      marginBottom: '0.5em',
      fontSize: 18,
      fontWeight: 700
    }}>
        <Icon type="border"
              theme="twoTone"
              twoToneColor="#52c41a"
              style={{
                marginRight: 5
              }}
              {...icon}
        />
      {`${label}: `}
      </span>
  ) || (
    <span>{`${label}: `}</span>
  );
  // 默认props
  let rowProps: any = {
    type: "flex",
    align: "middle",
    gutter: 16,
    style: {
      marginTop: 5,
      marginBottom: 5
    }
  };
  let labelProps: any = {
    style: {
      fontSize: 14,
      color: 'rgba(0,0,0,.85)',
      textAlign: 'left'
    }
  };
  let valueProps: any = {
    style: {
      color: 'rgba(0,0,0,.65)'
    }
  };
  // 基本风格
  if (layout === 'baseline') {
    valueProps = {
      ...valueProps,
      span: setValueCol
    };
    labelProps = {
      ...labelProps,
      span: setLabelCol
    }
  }
  // 伸缩风格，两端对齐
  if (layout === 'stretch') {
    rowProps.style = {
      ...rowProps.style,
      display: 'flex',
      justifyContent: 'space-between'
    }
  }

  return (
    <Row {...rowProps}>
      <Col {...labelProps}>{itemLabel}</Col>
      <Col {...valueProps}>{filterValue(row, dataResource)}</Col>
    </Row>
  )
}

/**
 * 平均间隔表格扩展字段
 * @param options 展示信息配置
 * @param dataResource 原数据
 * @returns {any}
 */
export const gridInfoUtil = (options: GridInfoProps, dataResource?: object) => {
  const {setCol, rows, setLabelCol = 8, setValueCol = 16, layout = 'baseline'} = options;
  if (!dataResource || (!rows || !rows.length)) {
    return "无";
  }

  return (
    <Row>
      {
        rows.map((row: RowItem, index) => {
          return (
            <Col key={index}
                 lg={6}
                 md={12}
                 xl={6}
                 xs={24}
                 {...setCol}
            >
              {
                infoUtil({
                  row,
                  layout,
                  setLabelCol,
                  setValueCol,
                  dataResource
                })
              }
            </Col>
          )
        })
      }
    </Row>
  );
};
